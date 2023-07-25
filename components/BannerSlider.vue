<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useSliderStore } from '../store/Slider'

const { name } = useDisplay()
const sliderStore = useSliderStore()
const slideHeight = computed(() => name.value == 'xs' ? 275 : 375)
const sliderUpdate = (i: any) => {
    console.log(i)
    // console.log(sliderStore.slides[i])
}
const Slides = computed(() => sliderStore.slides)
</script>

<template>
    <v-carousel
        cycle
        :height="slideHeight"
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