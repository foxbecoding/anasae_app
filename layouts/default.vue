<script setup lang="ts">
import { useDisplay } from 'vuetify'

const route = useRoute()
const { smAndDown, platform } = useDisplay()
const scrollY = ref<number>(0)
const appBarMobileClass = ref<string>('app-bar--relative') 
const App_Bar_Color = computed(() => scrollY.value !== 0 ? 'app-bar-color' : '')
const App_Bar_Mobile_Pos = computed(() => appBarMobileClass)
const setTransparent = computed(() => scrollY.value == 0 ? 'transparent' : '')
const onScroll = (e: any): void => { scrollY.value = window.scrollY }

</script>

<template>
    <v-app id="app" data-test-id="app">
        <v-app-bar :color="setTransparent" class="app-bar" :class="[App_Bar_Color, App_Bar_Mobile_Pos]">
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarInner />
            </v-container>
        </v-app-bar>
        <v-container class=" mobile-top-bar-container py-2" :class="App_Bar_Color" fluid>
            <MobileTopBar />
        </v-container>
        <BannerSliderBg v-if="route.name == 'index'" />
        <v-main class="main-adjust-content" v-scroll="onScroll">
            <slot></slot>
        </v-main>
        <BottomNav v-if="smAndDown" class="d-md-none w-100"/>
    </v-app>
</template>

<style scoped>
.app-bar {
    position: inherit;
}

@media screen and (max-width:  960px) {
    .app-bar{
        position: relative !important;
    }
    .app-bar--relative {
        position: relative !important;
    }
    .app-bar--fixed {
        position: fixed !important;
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
.mobile-top-bar-container {
    position: sticky; 
    top: 0px;
    z-index: 2;
}

.mobile-top-bar-container::before{
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