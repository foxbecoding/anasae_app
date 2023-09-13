<script lang="ts" setup>
import { useCategoryStore } from '@/store'
</script>

<template>
<v-chip-group class="flex-nowrap slider">
  <v-chip 
    class="flex-0-0"
    :class="n === 0 ? 'ml-4 ml-sm-8': ''" 
    v-for="(category, n) in useCategoryStore().categories" 
    :key="n"
  >
    {{ category.title }}
  </v-chip>
</v-chip-group>

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