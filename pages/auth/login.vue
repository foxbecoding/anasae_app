<script setup lang="ts">
import Home from '@/pages/index.vue'
const dialog = ref<boolean>(true)

</script>


<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="600px"
    >
        <v-card height="1000px" rounded="xl">
            <v-container>
                <div class="d-flex justify-space-between">
                    <v-card-title class="text-h4">
                    Login
                    </v-card-title>
                    <Logo />
                </div>
                <v-card-text>Login form </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
    <Home />
</template>