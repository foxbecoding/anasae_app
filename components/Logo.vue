<script setup lang="ts">

const { Logo } = useMediaAssets()
</script>

<template>
    <NuxtLink :to="{name: 'clipz'}" class="w-100">
        <v-img 
            id="logo" 
            data-test-id="logo"
            :src="Logo" 
            alt="Anasae logo" 
        />
    </NuxtLink>
</template>

<style scoped>
#logo:hover { cursor: pointer; }
</style>