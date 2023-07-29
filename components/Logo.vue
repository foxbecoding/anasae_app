<script setup lang="ts">
import { useRouter } from '#vue-router'

const { Logo } = useMediaAssets() 
const router = useRouter()
const clickHandler = (): void => {
    router.push({name: 'clipz'})}
</script>

<template>
    <v-img 
        id="logo" 
        data-test-id="logo"
        :src="Logo" 
        alt="Anasae logo" 
        @click="clickHandler()" 
    />
</template>

<style scoped>
#logo:hover { cursor: pointer; }
</style>