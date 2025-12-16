import React from 'react';
import { TOTAL_STEPS } from '../constants';

function StepIndicator({ currentStep }: { currentStep: number }) {
	return (
		<nav className="step-indicator" aria-label="Formular-Fortschritt">
			<ul>
				{Array.from({ length: TOTAL_STEPS }, (_, i) => (
					<li key={i} className={`step-number ${i + 1 === currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}>
						{String(i + 1).padStart(2, '0')}
					</li>
				))}
			</ul>
		</nav>
	);
}

export default StepIndicator;
