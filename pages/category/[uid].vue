<script setup lang="ts">
import { useAuthStore } from '@/store'

const config = useRuntimeConfig()
const authStore = useAuthStore()
const route = useRoute()
const category = ref()

const UID = computed(() => {
    if (route.fullPath.includes('auth')){
        return authStore.prevRoute.split('/').slice(-1)[0]   
    }
    return route.params.uid
})

const {data: cachedCategory} = await useNuxtData(`${config.public.API_CATEGORY_PAGE}${UID.value}/`)
if(cachedCategory.value) category.value = cachedCategory.value

if(!cachedCategory.value){
  const {data} = await useApi({
      method: 'GET', 
      path: `${config.public.API_CATEGORY_PAGE}${UID.value}/`,
      key: `${config.public.API_CATEGORY_PAGE}${UID.value}/`
  })
  category.value = data.value
}

</script>

<template>
    <v-container class="px-sm-8" fluid>
        <h1 class="text-h5 text-sm-h4">{{category.title}}</h1>
    </v-container>
    <v-container class=" pt-0 px-sm-8" fluid>
      <v-row>
        <v-col
          v-for="(listing, l) in category['product_listings']" 
          :key="l"
          :cols="12"
          :sm="6"
          :md="3"
        > 
          <ProductListing :listing="listing" />
        </v-col>
      </v-row>
    </v-container>
</template>