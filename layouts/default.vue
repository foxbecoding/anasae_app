<script setup lang="ts">
import { useSliderStore } from '../store/Slider';

const sliderStore = useSliderStore()
const pageYOffset = ref<number>(0)
const App_Bar_Color = computed(() => pageYOffset.value !== 0 ? 'app-bar-color' : '')
const setTransparent = computed(() => pageYOffset.value == 0 ? 'transparent' : '')
const onScroll = (e: any): void => {
    pageYOffset.value = window.scrollY
}
</script>

<template>
    <v-app>
        <v-app-bar :color="setTransparent" class="app-bar" :class="App_Bar_Color">
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarInner />
            </v-container>
        </v-app-bar>
        <v-container class="d-md-none app-mobile-search-container py-2" :class="App_Bar_Color" fluid>
            <SearchBar />
        </v-container>
        
        <div class="banner-slider" :style="{backgroundImage: `url(${sliderStore.currentSlide.src})`}"></div>
        
        <v-main class="main-adjust-content" v-scroll="onScroll">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style scoped>
.app-bar {
    position: fixed;
}

@media screen and (max-width:  960px) {
    .app-bar{
        position: relative !important;
    }
}

.app-bar::before{
    content: "";
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.app-bar-color {
    background: rgba(var(--v-theme-background), 0.3) !important;
}

.main-adjust-content {
    padding-top: 64px !important;
}

@media screen and (max-width:  960px) {
    .main-adjust-content {
        padding-top: 0px !important;
    }
}
.app-mobile-search-container {
    position: sticky; 
    top: 0px;
    z-index: 2;
}

.app-mobile-search-container::before{
    content: "";
    background: inherit;
    position: absolute;
    top: 0;
    left: 0;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}


</style>