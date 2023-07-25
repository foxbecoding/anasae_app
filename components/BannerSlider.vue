<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { name } = useDisplay()
const items = ref<{src: string, class: string}[]>([
    {
        src: 'http://192.168.1.235:3058/media/assets/slide1.png',
        class: 'slide1'
    },
    {
        src: 'http://192.168.1.235:3058/media/assets/slide5.png',
        class: 'slide2'
    },
    {
        src: 'http://192.168.1.235:3058/media/assets/slide3.png',
        class: 'slide3'
    },
    {
        src: 'http://192.168.1.235:3058/media/assets/slide4.png',
        class: 'slide4'
    },
])

const slideHeight = computed(() => name.value == 'xs' ? 275 : 375)
const sliderUpdate = (i: any) => {
    console.log(items.value[i])
}
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
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            cover
        >
        </v-carousel-item>
    </v-carousel>
</template>

<style scoped>

</style>