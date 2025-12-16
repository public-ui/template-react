import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolInputCheckbox, KolHeading, KolAlert } from '@public-ui/react-v19';
import { AUFWANDS_ARTEN } from '../../constants';

function Step3() {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext();
	const aufwandsArt = watch('aufwands_art') || [];

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Damit wir Ihr Anliegen richtig einordnen können: Helfen Sie uns, die Art des Aufwands zu erfassen." />
			<p className="subtitle">(Mehrfachauswahl möglich)</p>

			<div className="form-field checkbox-list">
				<Controller
					name="aufwands_art"
					control={control}
					rules={{
						validate: (value) => (value && value.length > 0) || 'Bitte wählen Sie mindestens eine Option aus.',
					}}
					render={({ field }) => (
						<>
							{AUFWANDS_ARTEN.map((art) => (
								<div key={art.value} className="checkbox-item">
									<KolInputCheckbox
										_label={art.label}
										_checked={aufwandsArt.includes(art.value)}
										_on={{
											onInput: (_event, checked) => {
												const newValue = checked ? [...aufwandsArt, art.value] : aufwandsArt.filter((v: string) => v !== art.value);
												field.onChange(newValue);
											},
										}}
									/>
								</div>
							))}
						</>
					)}
				/>
				{errors.aufwands_art && (
					<KolAlert _type="error" _variant="msg">
						{String(errors.aufwands_art.message)}
					</KolAlert>
				)}
			</div>
		</div>
	);
}

export default Step3;
