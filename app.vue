<script lang="ts" setup>
import { useSliderStore, useUserStore } from '@/store'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const userStore = useUserStore()

const initialize = async (): Promise<void> => {
  userStore.init()
  sliderStore.init()
  nextTick(async () => {
    await useApi({
      method: 'GET',
      path: `${config.public.API_X_FCT}`
    })
  }) 
}

initialize()

</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>