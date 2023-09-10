<script setup lang="ts">
import { useAuthStore } from '@/store'

const config = useRuntimeConfig()
const authStore = useAuthStore()
const { Asset: Video } = useMediaAssets(`${config.public.CDN_MEDIA_ASSETS_PATH}sell-on-anasae-vid.mp4`)
const { Asset: VideoImg } = useMediaAssets(`${config.public.CDN_MEDIA_ASSETS_PATH}sell-on-anasae-vid-img.png`)
const GetStartedPath = computed(() => authStore.isAuth ? 'brand-center' : 'auth-sign-up')
const getStarted = (): void => {
    navigateTo({name: GetStartedPath.value})
    authStore.setPrevRouteData(useRoute().fullPath, useRoute().name)
}
</script>

<template>
    <div style="position: relative; background: #000; height: 100vh;">
        <video 
            id="background-video" 
            style="position: relative" 
            :poster="VideoImg"
            autoplay 
            loop 
            muted 
        >
            <source 
                :src="Video" 
                type="video/mp4"
            >
        </video>
        <div class="w-100 d-flex flex-column fill-height justify-center align-center text-center text-white vid-content">
            <h1 class="text-h4 text-sm-h2 font-weight-thin mb-4 px-4" style="max-width: 800px;">
                Start selling your products with {{ config.public.COMPANY_NAME }}
            </h1>
            <h2 class="subheading">
                Join our growing community of Black owned Brands
            </h2>
            
            <v-btn 
                class="nana-primary-color mt-4"
                rounded="pill"
                flat 
                @click="getStarted()"
            >
                Get Started
            </v-btn>
        
        </div>
    </div>
</template>

<style scoped>
#background-video {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.75;
}

.vid-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>