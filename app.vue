<script lang="ts" setup>
import { 
  useAuthStore, 
  useBrandStore, 
  useCategoryStore,
  useSliderStore, 
  useUserStore 
} from '@/store'
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const vTheme = useTheme()

const LayoutTheme = computed(() => {
  if(authStore.prevRouteName === 'sell-on-anasae' 
    && (useRoute().name == 'auth-login' 
    || useRoute().name == 'auth-sign-up' 
    || useRoute().name == 'auth-forgot-password')) {
    return 'sell-on-anasae-layout'
  }
  if(useRoute().name == 'sell-on-anasae'){
    return 'sell-on-anasae-layout'
  }else if(useRoute().name == 'add-your-brand'){
    return 'add-your-brand-layout'
  }else if(String(useRoute().name).includes('brand-center')){
    return 'brand-center-layout'
  }
  return 'default'
})

vTheme.global.name.value = useCookie('theme', {
  default: () => 'anasaeDark',
  maxAge: 1000000,
  sameSite: 'lax'
}).value

const initialize = async (): Promise<void> => {
  sliderStore.init()
  userStore.init()
  categoryStore.init()
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
  <NuxtLayout :name="LayoutTheme">
    <NuxtPage/>
  </NuxtLayout>
</template>