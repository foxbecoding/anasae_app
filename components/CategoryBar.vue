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

</script>

<template>
  <div
    style="position: relative;"
    class="py-4"
    v-for="(category, i) in categories" 
    :key="i"
  >
    <v-container class="d-flex py-0 px-sm-8" fluid>
      <h2 class="text-h6 text-sm-h5">
        {{ category.title }}
      </h2>
      <v-spacer />
      <v-btn 
        :to="{name: `category-uid`, params: {uid: category.uid}}"
        class="d-none d-md-flex" 
        color="primary-alt" 
        variant="text" 
        text="View More"
      />
    </v-container>
    <v-container class="d-flex d-md-none images-container px-sm-8" fluid>
      <div class="d-flex justify-space-between">
        <div 
          v-for="(listing, l) in category['product_listings']" 
          :key="l"
          class="ml-4"
          style="width: 180px;"
        >
          <ProductListing :listing="listing" />
        </div>
      </div>
    </v-container>
    <v-container class="d-none d-md-block px-sm-8" fluid>
      <v-row>
        <v-col
          v-for="(listing, l) in category['product_listings'].slice(0, 4)" 
          :key="l"
          :cols="12"
          :sm="3"
        >
          <ProductListing :listing="listing" />
        </v-col>
      </v-row>
    </v-container>
    <v-btn 
      :to="{name: `category-uid`, params: {uid: category.uid}}"
      class="mx-auto d-flex d-md-none" 
      color="primary-alt" 
      variant="text" 
      width="120px"
      text="View More"
    />
  </div>
</template> 

<style scoped>
.images-container{
  overflow-x: auto;
  position: relative;
  -ms-overflow-style: none; 
  scrollbar-width: none;  
}

.images-container::-webkit-scrollbar {
  display: none
}
</style>