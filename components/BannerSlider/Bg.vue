<script setup lang="ts">
import { useSliderStore } from '@/store/Slider'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()

</script>

<template>
<div class="banner-slider" :style="{backgroundImage: `url(${config.public.CDN_URL+sliderStore.currentSlide.image})`}"></div>
</template>