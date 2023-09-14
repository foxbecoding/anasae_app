<script setup lang="ts">

</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-sm-8" fluid>
                <AppBarInnerStart /> Brand Center
            </v-container>
        </v-app-bar>
        <v-main class="main-adjust-content">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style scoped>
.main-adjust-content {
    padding-top: 60px !important;
}

</style>