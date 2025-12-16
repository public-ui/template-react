import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolTextarea, KolHeading } from '@public-ui/react-v19';

function Step5() {
	const { control } = useFormContext();

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Gibt es einen Zusammenhang zwischen Ihrer Angabe und einer Behörde?" />

			<div className="form-field">
				<Controller
					name="behoerde"
					control={control}
					render={({ field }) => (
						<KolTextarea
							id="behoerde"
							_label="In Betracht kommt z.B. die Behörde, von der Sie einen Bescheid, ein Schreiben oder eine E-Mail erhalten haben."
							_rows={8}
							_maxLength={300}
							_hasCounter
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

export default Step5;
