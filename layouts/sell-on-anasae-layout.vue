<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { AuthRouteName as RouteName } from '@/utils/types'

const route = useRoute()
const { AuthFormComponent, authRouteNames } = useAuthFormFactory()
const { smAndDown } = useDisplay()
const scrollY = ref<number>(0)

const AppBarColor = computed((): string => scrollY.value !== 0 ? 'app-bar-color' : '')

const SetTransparent = computed((): string => scrollY.value == 0 ? 'transparent' : '')
const ShowAuthForm = computed((): boolean => authRouteNames.value.includes(route.name as RouteName) )
const onScroll = (e: any): void => { scrollY.value = window.scrollY }

</script>

<template>
    <v-app id="app" data-test-id="app">
        <v-app-bar :color="SetTransparent" class="app-bar" :class="[AppBarColor]">
            <v-container class="px-sm-8" fluid>
                <AppBarInnerStart />
            </v-container>
        </v-app-bar>
        <v-main class="main-adjust-content" v-scroll="onScroll">
            <slot></slot>
        </v-main>

        <BottomNav v-if="smAndDown" class="d-md-none w-100" />
        <Auth v-if="ShowAuthForm" >
            <component :is="AuthFormComponent" />
        </Auth> 
        <UserMenuMobile />
    </v-app>
</template>

<style scoped>
.app-bar-no-color {
    background: transparent;
}
.app-bar {
    position: sticky;
    top: 0;
    background: transparent;
}

.app-bar-color {
    background: rgba(var(--v-theme-background), 0.3) !important;
}

.app-bar-color::before{
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

.main-adjust-content {
    padding-top: 0px !important;
}

</style>