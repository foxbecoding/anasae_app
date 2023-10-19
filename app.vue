<script lang="ts" setup>
import { 
  useAuthStore, 
  useBrandStore, 
  useCategoryStore,
  useSliderStore, 
  useUserStore,
  useCartStore 
} from '@/store'
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const sliderStore = useSliderStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const vTheme = useTheme()
const showSplashScreen = ref(true)

vTheme.global.name.value = useCookie('theme', {
  default: () => 'anasaeDark',
  maxAge: 1000000,
  sameSite: 'lax'
}).value

const initialize = async (): Promise<void> => {
  sliderStore.init()
  userStore.init()
  cartStore.init()
  // categoryStore.init()
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

onMounted(() => showSplashScreen.value = false)

</script>

<template>
  <div>
    <SplashScreen v-if="showSplashScreen"/>
    <NuxtPage :class="showSplashScreen ? 'd-none' : 'd-block'"/>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: transform .3s linear; 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.slide-enter-from {
    transform: translateX(-100%);
}
.slide-leave-to {
    transform: translateX(100%);
}
</style>