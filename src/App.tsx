import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { KolButton, KolForm } from '@public-ui/react-v19';
import './App.css';
import { TOTAL_STEPS } from './constants';
import { generateCaptcha } from './utils';
import StepIndicator from './components/StepIndicator';
import StartPage from './components/StartPage';
import SuccessPage from './components/SuccessPage';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6 from './components/steps/Step6';
import Step7 from './components/steps/Step7';

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

function App() {
	// Hash-Route zu Step konvertieren
	const getStepFromHash = () => {
		const hash = window.location.hash;
		const match = hash.match(/#step-(\d+)/);
		if (match) {
			const step = parseInt(match[1], 10);
			if (step >= 1 && step <= TOTAL_STEPS) {
				return step;
			}
		}
		return 1;
	};

	const [started, setStarted] = useState(window.location.hash.includes('step-'));
	const [currentStep, setCurrentStep] = useState(getStepFromHash());
	const [submitted, setSubmitted] = useState(false);
	const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
	const formRef = useRef<HTMLKolFormElement | null>(null);

	const methods = useForm({
		defaultValues: {
			beschreibung: '',
			bereich: '',
			aufwands_art: [],
			verwaltungsleistung: '',
			behoerde: '',
			nutzniesser: '',
			datenschutz: false,
			captcha: '',
		},
		mode: 'onSubmit',
	});

	const {
		handleSubmit,
		trigger,
		watch,
		reset,
		formState: { errors },
	} = methods;

	// Werte beobachten für Button-Status
	const beschreibung = watch('beschreibung') || '';
	const bereich = watch('bereich');
	const aufwandsArt = watch('aufwands_art') || [];
	const nutzniesser = watch('nutzniesser');
	const datenschutz = watch('datenschutz');
	const captcha = watch('captcha');

	// Validierungsfehler für aktuellen Schritt sammeln
	const [validationErrors, setValidationErrors] = useState<Array<{ message: string; selector?: string | (() => void) }>>([]);

	// Hash-Route mit currentStep synchronisieren
	useEffect(() => {
		if (started && !submitted) {
			window.location.hash = `step-${currentStep}`;
		} else if (!started) {
			window.location.hash = '';
		} else if (submitted) {
			window.location.hash = 'success';
		}
	}, [currentStep, started, submitted]);

	// Browser Vor/Zurück Navigation unterstützen
	useEffect(() => {
		const handleHashChange = () => {
			if (window.location.hash === '#success') {
				return;
			}
			const step = getStepFromHash();
			if (step !== currentStep && started && !submitted) {
				setCurrentStep(step);
				setValidationErrors([]);
			}
		};

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, [currentStep, started, submitted]);

	const getValidationErrors = useCallback(() => {
		const errors: Array<{ message: string; selector?: string | (() => void) }> = [];
		switch (currentStep) {
			case 1:
				if (beschreibung.length < 10) {
					errors.push({
						message: 'Bitte geben Sie mindestens 10 Zeichen in der Beschreibung ein.',
						selector: () => {
							const el = document.querySelector('kol-textarea#beschreibung');
							(el as any)?.kolFocus?.();
						},
					});
				}
				break;
			case 2:
				if (!bereich) {
					errors.push({
						message: 'Bitte wählen Sie einen Bereich aus.',
						selector: () => {
							const el = document.querySelector('kol-input-radio#bereich');
							(el as any)?.kolFocus?.();
						},
					});
				}
				break;
			case 3:
				if (aufwandsArt.length === 0) {
					errors.push({
						message: 'Bitte wählen Sie mindestens eine Aufwandsart aus.',
						selector: () => {
							const el = document.querySelector('kol-input-checkbox');
							(el as any)?.kolFocus?.();
						},
					});
				}
				break;
			case 6:
				if (!nutzniesser) {
					errors.push({
						message: 'Bitte wählen Sie aus, wer davon profitieren würde.',
						selector: () => {
							const el = document.querySelector('kol-input-radio#nutzniesser');
							(el as any)?.kolFocus?.();
						},
					});
				}
				break;
			case 7:
				if (!datenschutz) {
					errors.push({
						message: 'Bitte bestätigen Sie die Datenschutzerklärung.',
						selector: () => {
							const el = document.querySelector('kol-input-checkbox');
							(el as any)?.kolFocus?.();
						},
					});
				}
				if (!captcha || captcha.trim() === '') {
					errors.push({
						message: 'Bitte geben Sie den Captcha-Code ein.',
						selector: () => {
							const el = document.querySelector('kol-input-text');
							(el as any)?.kolFocus?.();
						},
					});
				} else if (captcha.length !== captchaCode.length) {
					errors.push({
						message: `Der Captcha-Code muss genau ${captchaCode.length} Zeichen haben.`,
						selector: () => {
							const el = document.querySelector('kol-input-text');
							(el as any)?.kolFocus?.();
						},
					});
				} else if (captcha !== captchaCode) {
					errors.push({
						message: 'Der eingegebene Captcha-Code ist nicht korrekt.',
						selector: () => {
							const el = document.querySelector('kol-input-text');
							(el as any)?.kolFocus?.();
						},
					});
				}
				break;
		}
		return errors;
	}, [currentStep, beschreibung, bereich, aufwandsArt, nutzniesser, datenschutz, captcha, captchaCode]);

	const validateCurrentStep = async () => {
		const fieldsToValidate: Record<number, string[]> = {
			1: ['beschreibung'],
			2: ['bereich'],
			3: ['aufwands_art'],
			4: ['verwaltungsleistung'],
			5: ['behoerde'],
			6: ['nutzniesser'],
			7: ['datenschutz', 'captcha'],
		};

		const fields = fieldsToValidate[currentStep] || [];
		if (fields.length === 0) return true;

		const result = await trigger(fields);
		return result;
	};

	const handleNext = useCallback(async () => {
		const errors = getValidationErrors();
		if (errors.length > 0) {
			setValidationErrors(errors);
			setTimeout(() => formRef.current?.focusErrorList(), 100);
			return;
		}
		setValidationErrors([]);
		const isValid = await validateCurrentStep();
		if (isValid && currentStep < TOTAL_STEPS) {
			setCurrentStep(currentStep + 1);
		}
	}, [currentStep, getValidationErrors, validateCurrentStep]);

	const handleBack = useCallback(() => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	}, [currentStep]);

	const onSubmit = useCallback(
		(data: any) => {
			const errors = getValidationErrors();
			if (errors.length > 0) {
				setValidationErrors(errors);
				setTimeout(() => formRef.current?.focusErrorList(), 100);
				return;
			}
			setValidationErrors([]);
			console.log('Form submitted:', data);
			setSubmitted(true);
		},
		[getValidationErrors],
	);

	const handleReset = useCallback(() => {
		reset();
		setCaptchaCode(generateCaptcha());
		setCurrentStep(1);
		setStarted(false);
		setSubmitted(false);
		window.location.hash = '';
	}, [reset]);

	const refreshCaptcha = useCallback(() => {
		setCaptchaCode(generateCaptcha());
		methods.setValue('captcha', '');
	}, [methods]);

	// Behandle Enter-Taste: nur Step absenden, nicht ganzes Formular
	const handleFormKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter' && !(e.target as HTMLElement).tagName.includes('TEXTAREA')) {
				e.preventDefault();
				if (currentStep < TOTAL_STEPS) {
					handleNext();
				}
			}
		},
		[currentStep, handleNext],
	);

	// Fokussiere erstes Eingabefeld beim Seitenwechsel
	useEffect(() => {
		if (!started || submitted) return;

		const focusFirstField = () => {
			// Radio-Gruppen (Step 2 & 6) werden in ihren Komponenten fokussiert
			if (currentStep === 2 || currentStep === 6) {
				return;
			}

			// Für andere Seiten
			const selectors = ['kol-textarea', 'kol-input-checkbox', 'kol-input-text'];
			for (const selector of selectors) {
				const element = document.querySelector(selector);
				if (element) {
					(element as any).kolFocus?.();
					break;
				}
			}
		};

		setTimeout(focusFirstField, 150);
	}, [currentStep, started, submitted]);

	// Startseite
	if (!started) {
		return (
			<div className="app">
				<StartPage onStart={() => setStarted(true)} />
			</div>
		);
	}

	// Erfolgsseite
	if (submitted) {
		return (
			<div className="app app-light">
				<SuccessPage onReset={handleReset} />
			</div>
		);
	}

	// Formular rendern
	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <Step1 />;
			case 2:
				return <Step2 />;
			case 3:
				return <Step3 />;
			case 4:
				return <Step4 />;
			case 5:
				return <Step5 />;
			case 6:
				return <Step6 />;
			case 7:
				return <Step7 captchaCode={captchaCode} onRefreshCaptcha={refreshCaptcha} />;
			default:
				return null;
		}
	};

	return (
		<div className="app">
			<StepIndicator currentStep={currentStep} />
			<FormProvider {...methods}>
				<KolForm
					ref={formRef}
					className="form-container"
					_errorList={validationErrors}
					_on={{
						onSubmit: (e) => {
							e?.preventDefault();
							handleSubmit(onSubmit)(e as any);
						},
					}}
					onKeyDown={handleFormKeyDown}
				>
					<div className="step-wrapper">{renderStep()}</div>

					<div className="button-row">
						{currentStep < TOTAL_STEPS ? (
							<KolButton _label="weiter" _variant="primary" _on={{ onClick: handleNext }} />
						) : (
							<KolButton _label="Absenden" _variant="primary" _type="submit" />
						)}
						{currentStep > 1 && <KolButton _label="zurück" _variant="secondary" _on={{ onClick: handleBack }} />}
					</div>
				</KolForm>
			</FormProvider>
		</div>
	);
}

export default App;
