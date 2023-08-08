<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useSliderStore } from '@/store/Slider'

const config = useRuntimeConfig()
const { smAndDown } = useDisplay()
const sliderStore = useSliderStore()
const hovering = ref<boolean>(false)

const Slide_Height = computed(() => smAndDown.value  ? 245 : 375)
const Slides = computed(() => sliderStore.slides)
const Is_Hovering = computed<boolean>((): boolean => hovering.value)

const sliderUpdate = (i: any): void => { sliderStore.currentSlide = sliderStore.slides[i] }
const mouseoverHandler = (e: Event): void => { hovering.value = true }
const mouseleaveHandler = (e: Event): void => { hovering.value = false }
</script>

<template>
    <v-carousel
        data-test-id="slider"
        class="rounded-xl"
        :height="Slide_Height"
        hide-delimiter-background
        show-arrows="hover"
        cycle
        @update:modelValue="sliderUpdate"
        @mouseover="mouseoverHandler"
        @mouseleave="mouseleaveHandler"
    >   
        <template  v-slot:prev="{ props }">
            <NanaSliderNavBtn
                v-if="Is_Hovering"
                data-test-id="slider-prev-btn"
                @click="props.onClick"
                icon
            >
                <v-icon>mdi-chevron-left</v-icon>
            </NanaSliderNavBtn>
        </template>
        <template v-slot:next="{ props }">
            <NanaSliderNavBtn
                v-if="Is_Hovering"
                data-test-id="slider-next-btn"
                @click="props.onClick"
                icon
            >
                <v-icon>mdi-chevron-right</v-icon>
            </NanaSliderNavBtn>
        </template>

        <v-carousel-item
            data-test-id="slider-slides"
            v-for="slide in Slides"
            :key="slide.pk"
            :src="config.public.CDN_URL+slide.image"
            cover
        >
        </v-carousel-item>
    </v-carousel>
</template>