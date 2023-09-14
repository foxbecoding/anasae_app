<script setup lang="ts">
const config = useRuntimeConfig()
const rail = ref<boolean>(false)
</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="pl-0 pl-sm-2 pr-sm-8 d-flex align-center" fluid>
                <v-app-bar-nav-icon 
                    variant="text" 
                    @click.stop="rail = !rail"
                />
                <div style="width: 30px;" class="ml-2 mr-4">
                    <v-img :src="`${config.public.CDN_MEDIA_URL}/assets/logo-icon.png`" />
                </div>
                <v-app-bar-title>Brand Center</v-app-bar-title>
            </v-container>
        </v-app-bar>
        <v-divider class="app-divider"/>
        <v-navigation-drawer
            color="background"
            :rail="rail"
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

.app-divider {
    top: 64px;
    position: absolute;
    width: 100%;
    z-index: 1005;
}

</style>