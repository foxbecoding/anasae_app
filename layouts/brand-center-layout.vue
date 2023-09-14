<script setup lang="ts">

</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-sm-8 d-flex" fluid>
                <AppBarInnerStart />
                <v-app-bar-title>Brand Center</v-app-bar-title>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer
            expand-on-hover
            :rail="false"
            permanent
        >
            <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"
            ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
            </v-list>
        </v-navigation-drawer>
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