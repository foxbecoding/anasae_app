<script setup lang="ts">
import { useAuthStore } from '@/store'

if(useAuthStore().isAuth){ navigateTo('/') }
const { PageComponent } = useAuthPageFactory()
</script>


<template>
  <component :is="PageComponent"/>
</template>