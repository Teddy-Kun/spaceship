<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
	<div>
		Page '{{ route.path }}'not found
	</div>
	<RouterLink to="/">
		<Button>Back to Index</Button>
	</RouterLink>
</template>