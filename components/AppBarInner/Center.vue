<script setup lang="ts">
const CENTER_CLASSES  = computed<string>((): string => {
    return "px-2 d-none d-md-flex flex-row align-center flex-0-1 search-container"
})
</script>

<template>
    <div id="center" :class="CENTER_CLASSES">
        <SearchBar />
    </div>
</template>

<style scoped>
#center.search-container{
    max-width: 500px;
    width: 100%;
}
</style>