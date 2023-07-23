<script setup lang="ts">
const test = useRuntimeConfig()
const dsd = computed(() => {})
</script>

<template>
    {{ test.public.CDN_MEDIA_URL }}
</template>