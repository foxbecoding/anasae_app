<script setup lang="ts">
import { useSliderStore } from '@/store/Slider'

const sliderStore = useSliderStore()

</script>

<template>
<div class="banner-slider" :style="{backgroundImage: `url(${sliderStore.currentSlide.src})`}"></div>
</template>