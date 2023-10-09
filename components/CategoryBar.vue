<script lang="ts" setup>
import { useCategoryStore } from '@/store'

const config = useRuntimeConfig()
const categories = ref<any[]>([])

const {data: cachedCategories} = await useNuxtData(`${config.public.API_CATEGORY_HOME_PAGE}`)
if(cachedCategories.value) categories.value = cachedCategories.value

if(!cachedCategories.value){
  const {data} = await useApi({
      method: 'GET', 
      path: `${config.public.API_CATEGORY_HOME_PAGE}`,
      key: `${config.public.API_CATEGORY_HOME_PAGE}`
  })
  categories.value = data.value
}

console.table(categories.value)
</script>

<template>
  <div
    style="position: relative;"
    v-for="(category, i) in categories" 
    :key="i"
  >
    <h2 class="px-4 px-sm-8" >
      {{ category.title }}
    </h2>
    <v-container class="px-4 px-sm-8" fluid>
      <v-row>
        <v-col
          v-for="(listing, l) in category['product_listings']" 
          :key="l"
          :cols="12"
          :sm="2"
        >
          
          <v-card color="transparent">
            <div class="w-100 bg-surface-el rounded px-2" >
            <v-img :src="config.public.CDN_URL+listing.image" />
          </div>
            <v-card-title class="text-body-2 px-0 pb-0">{{ listing.title }}</v-card-title>
            <span>${{ listing.base_variant.price.price/100 }}</span>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template> 

<style scoped>
.slider {
  position: relative;
}
.slider::-webkit-scrollbar {
  display: none;
}


.slider {
  -ms-overflow-style: none; 
  scrollbar-width: none;  
}
</style>