<script setup lang="ts">
import Home from '@/pages/index.vue'
const dialog = ref<boolean>(true)

</script>


<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Email & Username
        </v-card-title>
        <v-card-text>Login form </v-card-text>

      </v-card>
    </v-dialog>
    <Home />
</template>