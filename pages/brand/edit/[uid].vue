<script lang="ts" setup>
definePageMeta({
  middleware: ["brand-edit"]
})
const model = ref<boolean>(false)
onMounted(() => {
  model.value = true
})
</script>

<template>
  <BrandEditDetails v-model="model" @update:model-value="model = false"/>
  <Brand  />
</template>

<style scoped>
</style>