<script lang="ts" setup>
import { useUserMenuStore } from '@/store'

const userMenuStore = useUserMenuStore()
</script>

<template>
    <component :is="userMenuStore.CurrentView" />
</template>