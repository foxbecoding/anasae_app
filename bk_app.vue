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

const IsAuthRoute = computed(() => {
  var routeName = useRoute().name
  if(routeName == 'auth-login' 
    || routeName == 'auth-sign-up' 
    || routeName == 'auth-forgot-password') 
    {
      return true
    }else{
      return false
    }

})

// const LayoutTheme = computed(() => {
//   var routeName = useRoute().name
//   if(authStore.prevRouteName === 'sell-on-anasae' 
//     && IsAuthRoute.value) {
//     return 'sell-on-anasae-layout'
//   }
//   if(routeName == 'sell-on-anasae'){
//     return 'sell-on-anasae-layout'
//   }else if(routeName == 'add-your-brand'){
//     return 'add-your-brand-layout'
//   }else if(String(routeName).includes('brand-center')){
//     return 'brand-center-layout'
//   }
//   else if(routeName == 'product-lid'){
//     return 'product-listing-page-layout'
//   }
//   return 'default'
// })

const LayoutTheme = computed(() => {
  var routeName = useRoute().name
  if(authStore.prevRouteName === 'sell-on-anasae' && IsAuthRoute.value) return 'sell-on-anasae-layout'
  else if(authStore.prevRouteName == 'add-your-brand' && IsAuthRoute.value) return 'add-your-brand-layout'
  else if(authStore.prevRouteName == 'product-lid' && IsAuthRoute.value) return 'product-listing-page-layout'
  // if(routeName == 'sell-on-anasae'){
  //   return 'sell-on-anasae-layout'
  // }else if(routeName == 'add-your-brand'){
  //   return 'add-your-brand-layout'
  // }else if(String(routeName).includes('brand-center')){
  //   return 'brand-center-layout'
  // }
  // else if(routeName == 'product-lid'){
  //   return 'product-listing-page-layout'
  // }
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
</script>

<template>
  <NuxtPage/>
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