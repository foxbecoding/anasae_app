<script setup lang="ts">
const { Asset } = useMediaAssets('/assets/icon-dark-v1.png') 
const Icon = Asset.value
</script>

<template>
    <v-card 
        class="w-100 surface-bg"
        rounded="pill" 
        height="44px"
        density="compact"
    >
        <v-form>
            <v-text-field
                density="compact"
                flat
                placeholder="Search for products & brands"
                variant="solo-filled" 
                append-inner-icon="mdi-magnify"
                bg-color="transparent"
            >
                <template v-slot:prepend-inner>
                    <v-img :src="Icon" width="24"/>
                </template>
            </v-text-field>
        </v-form>   
    </v-card> 
</template>