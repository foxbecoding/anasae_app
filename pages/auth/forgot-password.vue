<script setup lang="ts">
const { PageComponent } = useAuthPageFactory()
</script>


<template>
    <component :is="PageComponent"/>
</template>