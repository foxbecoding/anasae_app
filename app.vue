<script lang="ts" setup>
import { useSliderStore } from '@/store/Slider'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
sliderStore.init()
onMounted(async () => {
  nextTick(() => {
    useFetch(`${config.public.API_BASE_URL}${config.public.API_X_FCT}`)
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>