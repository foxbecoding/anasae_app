<script lang="ts" setup>
import { useSliderStore, useUserStore, useBrandStore } from '@/store'
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const userStore = useUserStore()
const brandStore = useBrandStore()
const vTheme = useTheme()

vTheme.global.name.value = useCookie('theme', {
  default: () => 'anasaeDark',
  maxAge: 1000000,
  sameSite: 'lax'
}).value

const initialize = async (): Promise<void> => {
  sliderStore.init()
  userStore.init()
  nextTick(() => {
    $fetch(`${config.public.API_BASE_URL}${config.public.API_X_FCT}`)
  }) 
}

initialize()

onBeforeMount(async () => {
  await userStore.user.owned_brands
  if(userStore.user.owned_brands){
    brandStore.brands = await useGetOwnerBrands(userStore.user.owned_brands)
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>