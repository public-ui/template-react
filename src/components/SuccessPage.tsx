import React, { useCallback } from 'react';
import { KolButton } from '@public-ui/react-v19';

function SuccessPage({ onReset }: { onReset: () => void }) {
	const handleClick = useCallback(() => {
		onReset();
	}, [onReset]);

	return (
		<div className="success-page">
			<h1 className="yeah-text">YEAH</h1>
			<h2 className="danke-text">Danke!</h2>
			<p className="success-message">Ihre Meldung macht einen Unterschied.</p>
			<p className="success-slogan">Gemeinsam machen wir einfach!</p>
			<KolButton _label="Weiteren Vorschlag einreichen" _variant="secondary" _on={{ onClick: handleClick }} />
		</div>
	);
}

export default SuccessPage;
