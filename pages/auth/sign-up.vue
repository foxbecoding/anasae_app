<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})
const { PageComponent } = useAuthPageFactory()
</script>


<template>
    <component :is="PageComponent"/>
</template>