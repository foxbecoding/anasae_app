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
  <div>
      <NuxtLayout name="default">
        <BrandEditDetails v-model="model" @update:model-value="model = false"/>
        <Brand  />
      </NuxtLayout>
  </div>
</template>

<style scoped>
</style>