<script setup lang="ts">
import { useSliderStore } from '@/store/Slider'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const Slide = computed((): string => config.public.CDN_URL+sliderStore.currentSlide.image )

</script>

<template>
    <div 
        class="banner-slider" 
        :style="{backgroundImage: `url(${Slide})`}">
</div>
</template>