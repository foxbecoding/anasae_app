<script setup lang="ts">
const dialog = ref<boolean>(true)
</script>


<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="500px"
    >
        <v-card height="1000px" rounded="xl">
            <v-container>
                <div class="d-flex justify-space-between align-center">
                    <v-card-title class="text-h4">
                    Login
                    </v-card-title>
                    <div class="auth-form-logo-container w-100 ">
                        <Logo />
                    </div>
                </div>
                <v-card-text>Login form </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
</template>