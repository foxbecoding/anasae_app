<template>
    <v-snackbar
        :color="snackbarStore.color"
        v-model="snackbarStore.show"
        rounded="pill"
        z-index="2050"
        max-height="30"
    >
        <v-avatar class="mr-2 ml-n2" v-if="snackbarStore.imgSrc">
            <v-img :src="snackbarStore.imgSrc" cover/>
        </v-avatar>
        {{ snackbarStore.text }}

        <template v-slot:actions>
            <v-btn
                rounded="xl"
                color="primary"
                variant="text"
                @click="snackbarStore.show = false"
                icon="mdi-close"
                size="small"
            >
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/store'
const snackbarStore = useSnackbarStore()
</script>