<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { AuthRouteName as RouteName } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

const authStore = useAuthStore()
const route = useRoute()
const { AuthFormComponent, authRouteNames } = useAuthFormFactory()
const { smAndDown } = useDisplay()
const scrollY = ref<number>(0)

const AppBarColor = computed((): string => scrollY.value !== 0 ? 'app-bar-color' : '')
const AppBarMobilePos = computed((): string => {
    if (!authStore.isAuth && smAndDown.value) return 'app-bar--relative'
    return 'mobile-top-bar-container'
})
const SetTransparent = computed((): string => scrollY.value == 0 ? 'transparent' : '')
const ShowAuthForm = computed((): boolean => authRouteNames.value.includes(route.name as RouteName) )
const ShowBannerComps = computed((): boolean => authRouteNames.value.includes(route.name as RouteName) && authStore.prevRoute == '/' || route.name == 'index')

const onScroll = (e: any): void => { scrollY.value = window.scrollY }

</script>

<template>
    <v-app id="app" data-test-id="app">
        <v-app-bar :color="SetTransparent" class="app-bar" :class="[AppBarColor, AppBarMobilePos]">
            <v-container class="d-none d-md-flex justify-space-between px-sm-8" fluid>
                <AppBarInner />
            </v-container>
            <v-container 
                v-if="!authStore.isAuth" 
                class="d-flex d-md-none justify-space-between px-sm-8" fluid>
                <AppBarInner />
            </v-container>
            <v-container v-else class="d-md-none px-sm-8" fluid>
                <MobileTopBar />
            </v-container>
        </v-app-bar>
        <v-container v-if="!authStore.isAuth" class="mobile-top-bar-container d-md-none px-sm-8" :class="AppBarColor" fluid>
            <MobileTopBar />
        </v-container>
        <BannerSliderBg v-if="ShowBannerComps" />
        <v-main class="main-adjust-content" v-scroll="onScroll">
            <CategoryBar v-if="$route.name === 'index'"/>
            <v-container v-if="ShowBannerComps" class="px-sm-8" fluid>
                <BannerSlider />
            </v-container>
            <slot></slot>
        </v-main>

        <Snackbar />
        <BottomNav v-if="smAndDown" class="d-md-none w-100" />
        <Auth v-if="ShowAuthForm" >
            <component :is="AuthFormComponent" />
        </Auth> 
        <UserMenuMobile />
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
    padding-top: 0px !important;
}

.mobile-top-bar-container {
    position: sticky !important; 
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