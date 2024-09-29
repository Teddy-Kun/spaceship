/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import "virtual:uno.css";

import { setupLayouts } from "layouts-generated";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import generatedRoutes from "~pages";

import App from "./App.vue";
import NotFound from "./components/NotFound.vue";

const routes = setupLayouts(generatedRoutes);
routes.push({ path: "/:catchAll(.*)", component: NotFound });

const router = createRouter({
	history: createWebHistory(),
	routes
});

createApp(App)
	.use(router)
	.mount("#app");
