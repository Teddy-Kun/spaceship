import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import * as path from "path";
import tailwind from "tailwindcss";
import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
	plugins: [
		vue(),
		UnoCSS(),
		Pages(),
		Layouts(),
		Components()
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
