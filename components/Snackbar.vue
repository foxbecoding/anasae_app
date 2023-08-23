<template>
    <v-snackbar
        v-model="snackbarStore.show"
        rounded="pill"
        z-index="2050"
    >
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