<script lang="ts" setup>

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

// console.table(categories.value)
</script>

<template>
  <div
    style="position: relative;"
    class="py-4"
    v-for="(category, i) in categories" 
    :key="i"
  >
    <div class="d-flex px-4 px-sm-8">
      <h2 class="text-h6 text-sm-h5">
        {{ category.title }}
      </h2>
      <v-spacer />
      <v-btn class="d-none d-md-block" color="primary-alt" variant="text" text="View More"/>
    </div>
    <v-container class="d-flex d-md-none images-container px-4 px-sm-8" fluid>
      <div class="d-flex flex-md-wrap justify-space-between">
        <v-card 
          v-for="(listing, l) in category['product_listings']" 
          :key="l"
          class="ml-4"
          color="transparent"
          width="150px"
        >
          <div class="w-100 bg-surface-el rounded px-2" >
            <v-img :src="config.public.CDN_URL+listing.image" />
          </div>
          <v-card-title class="text-body-2 px-0 pb-0">{{ listing.title }}</v-card-title>
          <span>${{ listing.base_variant.price.price/100 }}</span>
        </v-card>
      </div>
    </v-container>
    <v-container class="d-none d-md-block px-4 px-sm-8" fluid>
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
    <v-btn class="mx-auto d-block d-md-none" color="primary-alt" variant="text" text="View More"/>
  </div>
</template> 

<style scoped>
.images-container{
    overflow-x: auto;
    position: relative;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    z-index: 1000
}

.images-container::-webkit-scrollbar {
    display: none
}
</style>