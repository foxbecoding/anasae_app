<script lang="ts" setup>
import { useUserMenuStore , useAuthStore } from '@/store'

const userMenuStore = useUserMenuStore()
</script>

<template>
    <component v-if="useAuthStore().isAuth" :is="userMenuStore.CurrentView" />
</template>