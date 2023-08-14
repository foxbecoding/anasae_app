<script lang="ts" setup>
import { useAuthStore, useSliderStore, useUserStore } from '@/store'

const config = useRuntimeConfig()
const authStore = useAuthStore()
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

onMounted(async () => {
  // nextTick(() => {
  //   useFetch(`${config.public.API_BASE_URL}${config.public.API_X_FCT}`)
  // })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>