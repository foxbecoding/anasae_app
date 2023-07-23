<template>
    <v-app>
        <v-app-bar>
            <v-container class="px-4 d-flex justify-space-between" fluid>
                <AppBarInnerStart />
                <AppBarInnerCenter />
                <AppBarInnerEnd />
                
            </v-container>
        </v-app-bar>
        <v-main class="pt-16">
            <slot></slot>
        </v-main>
    </v-app>
</template>