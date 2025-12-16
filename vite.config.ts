import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		dynamicImportVarsOptions: {
			exclude: [],
		},
	},
	resolve: {
		alias: {
			'@kern-ux-public-ui/theme-kolibri/assets': '/node_modules/@kern-ux-public-ui/theme-kolibri/assets',
		},
	},
	optimizeDeps: {
		exclude: ['@kern-ux-public-ui/theme-kolibri'],
	},
	plugins: [react(), UnoCSS()],
});
