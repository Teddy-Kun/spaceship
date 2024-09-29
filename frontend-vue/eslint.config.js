/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import eslint from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tsParser from "@typescript-eslint/parser";
import unocss from "@unocss/eslint-config/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort"; // TODO: replace with eslint-plugin-import as soon as it is updated
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
// import deprecation from "eslint-plugin-deprecation"; // TODO: wait for flat config support

const ignorePattern = "^_";

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...pluginVue.configs["flat/recommended"],
	unocss,
	{
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				sourceType: "module",
				extraFileExtensions: [".vue"],
				project: true,
			},
		},
	},
	{
		files: ["**/*.{js,ts,vue}"],
		plugins: {
			"typescript-eslint": tseslint.plugin,
			"@stylistic/js": stylisticJs,
			"@stylistic/ts": stylisticTs,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			// js rules
			"no-undef": "off",
			"eslint-comments/no-unlimited-disable": ["off"],
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"prefer-const": "warn",
			"no-restricted-exports": "error",
			"no-restricted-imports": "error",
			"no-await-in-loop": "warn",
			"no-inner-declarations": "error",
			"no-self-compare": "error",
			"no-template-curly-in-string": "warn",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"require-atomic-updates": "warn",
			"@stylistic/js/array-bracket-spacing": ["error", "never"],
			"@stylistic/js/indent": ["error", "tab"],
			"@stylistic/js/no-trailing-spaces": "warn",
			"simple-import-sort/imports": "error", // TODO: replace with "import/order" as soon as eslint-plugin-import is updated
			"@stylistic/js/max-len": ["off", { "code": 140 }], // TODO: broken by imports multiple times, fix as soon as the import plugin can deal with that automagically

			// ts rules
			"@stylistic/ts/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
			"@stylistic/ts/semi": ["warn", "always"],
			"@stylistic/ts/quotes": ["warn", "double"],
			"@stylistic/ts/object-curly-spacing": ["warn", "always"],
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/restrict-template-expressions": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/no-unsafe-return": "error",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-argument": "error",
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: ignorePattern }],
			"@typescript-eslint/ban-ts-comment": ["warn", {
				"ts-expect-error": true,
				"ts-ignore": true,
				"ts-nocheck": true,
				"ts-check": false,
				minimumDescriptionLength: 3,
			}],

			// vue rules
			"vue/multi-word-component-names": "off",
			"vue/max-attributes-per-line": "off",

			// The import plugin is out of date and not compatible with the flat eslint config format.
			// TODO: Re-add the plugin and re-evaluate these after it is
			// "unused-imports/no-unused-vars": "warn",
			// "import/no-unused-modules": "warn",
			// "import/no-unresolved": ["error", { ignore: ["^virtual:", "~pages", "uno.css"] }],
			// "import/no-restricted-paths": "error",
			// "import/named": "error",
			// "import/namespace": "error",
			// "import/default": "error",
			// "import/export": "error",
		},
	},

	// for some reason ignores only works if it is in a separate object :)
	{
		ignores: [
			"**/generated/",
			"**/node_modules/",
			"**/.pnpm-store/",
			"**/dist/",
		],
	},
];