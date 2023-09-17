<script lang="ts" setup>
import { VContainer  } from 'vuetify/components/VGrid'
import DetailsForm from './DetailsForm.vue'
import Images from './Images.vue'

const formSections = shallowRef([
    DetailsForm, 
    Images
])
</script>

<template>
    <h1 class="text-h5 text-sm-h4">Add product listing</h1>
    <v-container 
        v-for="(section, n) in formSections"
        :key="n" 
        class="px-0" 
    >
        <component :is="section"/>
    </v-container>
</template>