<script lang="ts" setup>
import { VContainer  } from 'vuetify/components/VGrid'
import Details from './Details.vue'
import Images from './Images.vue'
import PriceAndQuantity from './PriceAndQuantity.vue'
import Identifiers from './Identifiers.vue'
import Specifications from './Specifications.vue'
import Dimensions from './Dimensions.vue'

const formSections = shallowRef([
    Details, 
    Images,
    PriceAndQuantity,
    Dimensions,
    Identifiers,
    Specifications
])
</script>

<template>
    <h1 class="text-h5 text-sm-h4 px-6">Add product listing</h1>
    <v-container 
        v-for="(section, n) in formSections"
        :key="n" 
        class="mx-0 py-2"
        :class="section == Images ? 'px-0' : 'px-6'" 
    >
        <component :is="section"/>
    </v-container>
</template>