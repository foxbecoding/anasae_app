<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const { PageComponent } = useAuthPageFactory()
console.log(PageComponent)
</script>


<template>
  <component :is="PageComponent"/>
</template>