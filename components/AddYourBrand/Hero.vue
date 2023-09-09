<script setup lang="ts">

const config = useRuntimeConfig()
const { Asset: heroImg } = useMediaAssets(`${config.public.CDN_MEDIA_ASSETS_PATH}brand-landing-page-hero-opc.jpg`)

</script>

<template>
    <v-parallax style="height: calc(100vh - 64px)" :src="heroImg">
        <div class="d-flex flex-column fill-height justify-center align-center text-center text-white">
            <h1 class="text-h4 text-sm-h2 font-weight-thin mb-4 px-4" style="max-width: 800px;">
                Add your Black Owned Brand and Products
            </h1>
            <h2 class="subheading">
                Start selling to today!
            </h2>
            
            <v-btn 
                class="nana-primary-color mt-4"
                rounded="pill"
                flat 
            >
                Get Started
            </v-btn>
        
        </div>
    </v-parallax>
</template>