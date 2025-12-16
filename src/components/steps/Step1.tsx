import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolTextarea, KolHeading, KolAlert, KolDetails } from '@public-ui/react-v19';

function Step1() {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext();
	const beschreibung = watch('beschreibung') || '';

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Wo sollte es einfacher werden?" />

			<div className="form-field">
				<Controller
					name="beschreibung"
					control={control}
					rules={{
						required: 'Bitte geben Sie eine Beschreibung ein.',
						minLength: {
							value: 10,
							message: 'Geben Sie mindestens zehn Zeichen ein, um weiter klicken zu können.',
						},
					}}
					render={({ field }) => (
						<KolTextarea
							id="beschreibung"
							_label="An welcher Stelle war es kompliziert oder zu umständlich? Wie könnten wir es einfacher machen?"
							_rows={6}
							_maxLength={3000}
							_hasCounter
							_value={field.value}
							_on={{
								onInput: (_event, value) => field.onChange(value),
							}}
						/>
					)}
				/>
				{errors.beschreibung && (
					<KolAlert _type="error" _variant="msg">
						{String(errors.beschreibung.message)}
					</KolAlert>
				)}
			</div>

			<KolDetails _label="Hinweis">
				<p>Geben Sie bitte so konkret wie möglich (zur Orientierung) an.</p>
			</KolDetails>
		</div>
	);
}

export default Step1;
