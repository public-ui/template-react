import { register, KoliBriDevHelper } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { KERN_V2 } from '@kern-ux-public-ui/theme-kolibri';

register(KERN_V2, defineCustomElements)
	.then(() => {
		// Patch textarea padding
		KoliBriDevHelper.patchTheme(
			'kern-v2',
			{
				'KOL-TEXTAREA': `
				textarea {
					line-height: 1.25;
					padding: 0.5rem 0;
				}
			`,
			},
			{
				append: true,
			},
		);

		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			const root = createRoot(htmlElement);
			root.render(
				<StrictMode>
					<App />
				</StrictMode>,
			);
		}
	})
	.catch(console.error);
