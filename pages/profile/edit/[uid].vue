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
    <UserProfileEditDetails v-model="model" @update:model-value="model = false"/>
    <UserProfile />
</template>

<style scoped>
</style>