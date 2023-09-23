<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
const props = defineProps({
    id: Number
})

const store = useBrandCenterProductListingStore()
const description = ref<string>(store.productVariants.filter(x => x.id == props.id)[0].description)

</script>

<template>
   {{ description }}
</template>