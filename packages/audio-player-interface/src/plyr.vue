<script setup lang="ts">
import type { AudioService, AudioSource } from './types';
import { getAssetUrl } from '@directus-labs/utils';
import Plyr from 'plyr';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{ service: AudioService; source: AudioSource }>();

const el = ref();
let player: any;

onMounted(() => (player = new Plyr(el.value, { settings: [] })));

watch([() => props.service, () => props.source], updateSource);

function updateSource() {
	player.source = {
		type: 'audio',
		sources: [
			props.service === 'directus'
				? { src: getAssetUrl(props.source) }
				: { src: props.source },
		],
	};
}
</script>

<template>
	<div class="wrapper">
		<audio
			ref="el"
			:src="service === 'directus' ? getAssetUrl(source) : source"
			controls
		/>
	</div>
</template>

<style>
@import 'plyr';

:root {
	--plyr-color-main: var(--theme--primary);
	--plyr-control-radius: var(--theme--border-radius);
	--plyr-font-family: var(--theme--fonts--sans--font-family);
	--plyr-font-weight-regular: var(--theme--fonts--sans--font-weight);
	--plyr-audio-controls-background: transparent;
}
</style>

<style scoped>
.wrapper {
	margin-top: 4px;
	border-radius: var(--theme--border-radius);
	border: var(--theme--border-width) solid var(--v-input-border-color, var(--theme--form--field--input--border-color));
	background: var(--v-input-background-color, var(--theme--form--field--input--background));
}

.wrapper :deep(.plyr__controls) {
	height: var(--theme--form--field--input--height);
}
</style>
