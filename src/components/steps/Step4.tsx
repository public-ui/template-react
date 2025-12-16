import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolInputText, KolHeading } from '@public-ui/react-v19';

function Step4() {
	const { control } = useFormContext();

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Gibt es eine konkrete Verwaltungsleistung?" />
			<p className="subtitle">Optional: Nennen Sie uns die betroffene Verwaltungsleistung.</p>

			<div className="form-field">
				<Controller
					name="verwaltungsleistung"
					control={control}
					render={({ field }) => (
						<KolInputText
							_label="Name der Verwaltungsleistung"
							_placeholder="z.B. Personalausweis beantragen, Elterngeld..."
							_value={field.value}
							_on={{
								onInput: (_event, value) => field.onChange(value),
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default Step4;
