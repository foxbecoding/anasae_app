<template>
    <v-app>
        <v-app-bar  class="app-bar">
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarInner />
            </v-container>
        </v-app-bar>
        <v-container class="d-md-none app-mobile-search-container py-2">
            <SearchBar />
        </v-container>
        <v-main class="main-adjust-content">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style scoped>
.main-adjust-content {
    padding-top: 64px !important;
}

@media screen and (max-width:  960px) {
    .main-adjust-content {
        padding-top: 0px !important;
    }
}
.app-mobile-search-container {
    position: sticky; 
    top: 0px;
    z-index: 1;
}

.app-bar {
    position: fixed;
    background: rgba(var(--v-theme-background), 0.3) !important;
}

@media screen and (max-width:  960px) {
    .app-bar{
        position: relative !important;
    }
}

.app-bar::before{
    content: "";
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
}
</style>