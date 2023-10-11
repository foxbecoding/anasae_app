<script setup lang="ts">

const config = useRuntimeConfig()
const route = useRoute()
const category = ref()

const {data: cachedCategory} = await useNuxtData(`${config.public.API_CATEGORY_PAGE}${route.params.uid}/`)
if(cachedCategory.value) category.value = cachedCategory.value

if(!cachedCategory.value){
  const {data} = await useApi({
      method: 'GET', 
      path: `${config.public.API_CATEGORY_PAGE}${route.params.uid}/`,
      key: `${config.public.API_CATEGORY_PAGE}${route.params.uid}/`
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