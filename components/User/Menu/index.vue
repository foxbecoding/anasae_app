<script lang="ts" setup>
const {  selectedView } = useUserMenu()
</script>

<template>
    <component :is="selectedView" />
</template>