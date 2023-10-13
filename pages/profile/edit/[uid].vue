<script lang="ts" setup>
definePageMeta({
  middleware: ["profile"]
})

const model = ref<boolean>(false)
onMounted(() => {
  model.value = true
})

</script>

<template>
  <div>
    <NuxtLayout name="default">
      <UserProfileEditDetails v-model="model" @update:model-value="model = false"/>
      <UserProfile />
    </NuxtLayout>
  </div>
</template>

<style scoped>
</style>