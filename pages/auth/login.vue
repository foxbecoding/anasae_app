<script setup lang="ts">
import { useAuthStore } from '@/store'

// if(useAuthStore().prevRouteName == 'product-lid'){
//   definePageMeta({
//     layout: 'product-listing-page-layout'
//   })
// }

definePageMeta({
  layout:  false
})
if(useAuthStore().isAuth){ navigateTo('/') }
const { PageComponent } = useAuthPageFactory()
</script>

<template>
  <component :is="PageComponent"/>
</template>