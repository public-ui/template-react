import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolInputCheckbox, KolInputText, KolHeading, KolIcon } from '@public-ui/react-v19';

function Step7({ captchaCode, onRefreshCaptcha }: { captchaCode: string; onRefreshCaptcha: () => void }) {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext();
	const datenschutz = watch('datenschutz');

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Jetzt nur noch ..." />

			<div className="form-field">
				<Controller
					name="datenschutz"
					control={control}
					rules={{
						required: 'Bitte bestätigen Sie die Datenschutzerklärung.',
						validate: (value) => value === true || 'Sie müssen die Datenschutzerklärung akzeptieren.',
					}}
					render={({ field }) => (
						<KolInputCheckbox
							_label="Ich habe die Datenschutzerklärung gelesen."
							_checked={field.value}
							_on={{
								onInput: (_event, checked) => field.onChange(checked),
							}}
							_msg={errors.datenschutz ? { _type: 'error', _description: String(errors.datenschutz.message) } : undefined}
						/>
					)}
				/>
			</div>

			<div className="captcha-section">
				<label className="captcha-label">Captcha</label>
				<div className="captcha-row">
					<div className="captcha-image-wrapper">
						<div className="captcha-image">
							<span className="captcha-text">{captchaCode}</span>
						</div>
					</div>
					<button type="button" className="captcha-button" onClick={onRefreshCaptcha} title="Neues Captcha">
						<KolIcon _icons="codicon codicon-debug-restart" _label="" />
					</button>
					<button type="button" className="captcha-button" title="Vorlesen">
						<KolIcon _icons="codicon codicon-unmute" _label="" />
					</button>
				</div>

				<Controller
					name="captcha"
					control={control}
					rules={{
						required: 'Bitte geben Sie den Captcha-Code ein.',
						validate: (value) => value === captchaCode || 'Der eingegebene Captcha-Code ist nicht korrekt.',
					}}
					render={({ field }) => (
						<KolInputText
							_label=""
							_hideLabel
							_placeholder=""
							_value={field.value}
							_on={{
								onInput: (_event, value) => {
									field.onChange(value);
									// Auto-submit wenn Captcha korrekt ist
									if (value === captchaCode && datenschutz) {
										setTimeout(() => {
											const submitButton = document.querySelector('kol-button[_type="submit"]') as any;
											submitButton?.click();
										}, 300);
									}
								},
							}}
							_msg={errors.captcha ? { _type: 'error', _description: String(errors.captcha.message) } : undefined}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default Step7;
