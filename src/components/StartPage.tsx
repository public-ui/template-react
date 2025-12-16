import React, { useCallback } from 'react';
import { KolButton } from '@public-ui/react-v19';

function StartPage({ onStart }: { onStart: () => void }) {
	const handleClick = useCallback(() => {
		onStart();
	}, [onStart]);

	return (
		<div className="start-page">
			<h1 className="hero-text">LOS</h1>
			<p className="intro-text">
				Teilen Sie uns mit, wo es im Alltag oder bei der Arbeit mit Formularen, Abläufen oder digitalen Angeboten hakt oder zu umständlich ist.
			</p>
			<p className="slogan">Gemeinsam einfach machen.</p>
			<KolButton _label="Hier starten" _variant="primary" _on={{ onClick: handleClick }} />
		</div>
	);
}

export default StartPage;
