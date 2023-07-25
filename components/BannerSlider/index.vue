<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useSliderStore } from '@/store/Slider'

const { name } = useDisplay()
const sliderStore = useSliderStore()

const Slide_Height = computed(() => name.value == 'xs' ? 275 : 375)
const Slides = computed(() => sliderStore.slides)

const sliderUpdate = (i: any): void => {
    sliderStore.currentSlide = sliderStore.slides[i]
}
</script>

<template>
    <v-carousel
        cycle
        :height="Slide_Height"
        hide-delimiter-background
        show-arrows="hover"
        @update:modelValue="sliderUpdate"
    >
        <v-carousel-item
            v-for="slide in Slides"
            :key="slide.pk"
            :src="slide.src"
            cover
        >
        </v-carousel-item>
    </v-carousel>
</template>

<style scoped>

</style>