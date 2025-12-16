import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolInputRadio, KolHeading } from '@public-ui/react-v19';
import { BEREICHE } from '../../constants';

function Step2() {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const radioRef = useRef<any>(null);

	useEffect(() => {
		console.log(radioRef.current);
		setTimeout(() => {
			radioRef.current?.kolFocus?.();
		}, 1000);
	}, []);

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Welches Thema passt zu Ihrem Anliegen?" />

			<div className="form-field">
				<Controller
					name="bereich"
					control={control}
					rules={{ required: 'Bitte wählen Sie einen Bereich aus.' }}
					render={({ field }) => (
						<KolInputRadio
							ref={radioRef}
							_label="Bitte wählen Sie einen Bereich"
							_orientation="vertical"
							_options={BEREICHE}
							_value={field.value}
							_on={{
								onInput: (_event, value) => field.onChange(value),
							}}
							_msg={errors.bereich ? { _type: 'error', _description: String(errors.bereich.message) } : undefined}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default Step2;
