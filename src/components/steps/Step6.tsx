import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { KolInputRadio, KolHeading } from '@public-ui/react-v19';
import { NUTZNIESSER } from '../../constants';

function Step6() {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const radioRef = useRef<any>(null);

	useEffect(() => {
		setTimeout(() => {
			radioRef.current?.kolFocus?.();
		}, 1000);
	}, []);

	return (
		<div className="step-content">
			<KolHeading _level={2} _label="Wem würde die Vereinfachung nutzen?" />

			<div className="form-field">
				<Controller
					name="nutzniesser"
					control={control}
					rules={{ required: 'Bitte wählen Sie eine Option aus.' }}
					render={({ field }) => (
						<KolInputRadio
							ref={radioRef}
							_label="Bitte wählen Sie aus, wem die Vereinfachung nutzen würde"
							_orientation="vertical"
							_options={NUTZNIESSER}
							_value={field.value}
							_on={{
								onInput: (_event, value) => field.onChange(value),
							}}
							_msg={errors.nutzniesser ? { _type: 'error', _description: String(errors.nutzniesser.message) } : undefined}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default Step6;
