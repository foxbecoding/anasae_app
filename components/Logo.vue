<script setup lang="ts">
const { Logo } = useMediaAssets() 
const router = useRouter()
</script>

<template>
    <v-img id="logo" :src="Logo" alt="Anasae logo" @click="router.push('/')" />
</template>

<style scoped>
#logo:hover { cursor: pointer; }
</style>