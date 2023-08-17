<script lang="ts" setup>
import { useSliderStore, useUserStore } from '@/store'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const userStore = useUserStore()

const initialize = (): void => {
  userStore.init()
  sliderStore.init()
  nextTick(() => {
    $fetch(`${config.public.API_BASE_URL}${config.public.API_X_FCT}`)
  }) 
}

initialize()
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>