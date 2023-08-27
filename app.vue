<script lang="ts" setup>
import { useSliderStore, useUserStore } from '@/store'
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const userStore = useUserStore()
const vTheme = useTheme()

vTheme.global.name.value = useCookie('theme', {
  default: () => 'anasaeDark',
  maxAge: 1000000,
  sameSite: 'lax'
}).value

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