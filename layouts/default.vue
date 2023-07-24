<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarInner />
            </v-container>
        </v-app-bar>
        <v-container class="pt-16" style="position: sticky; top: 0px;">
            <SearchBar class="d-sm-none"/>
        </v-container>
        <v-main class="pt-16">
            <slot></slot>
        </v-main>
    </v-app>
</template>