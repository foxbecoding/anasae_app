<script lang="ts" setup>
import { useUserMenuStore, useBrandStore } from '@/store'
import { UserMenuBrandsAdd } from '../components'

const userMenuStore = useUserMenuStore()
const brandStore = useBrandStore()

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Manage brands">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.goBack"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list  v-if="brandStore.brands.length > 0" density="compact">
        <v-list-item 
            v-for="(brand, i) in brandStore.brands"
            @click="userMenuStore.close"
            :key="i"
            :value="brand"
            prepend-icon="mdi-storefront-outline"
            :title="brand.name"
            :to="{name: `brand-uid`, params: {uid: brand.uid}}"
        >
            <template v-slot:prepend>
                <v-avatar>
                    <v-img cover :src="useGetBrandLogo(brand.logo?.image)" />
                </v-avatar>
            </template>
        </v-list-item>
    </v-list>
    <v-container class="no-brands-container" v-else>
        <div class="text-center">
            <v-icon color="primary-alt" size="60">mdi-storefront-outline</v-icon>
            <p class="text-body-1 py-4">Add your brand and start selling today!</p>
        </div>  
    </v-container>  
    <v-container>
        <v-btn 
            color="primary-alt text-surface" 
            rounded="pill" 
            flat
            block
            @click="userMenuStore.selectedView = UserMenuBrandsAdd"
        >
            <v-icon>mdi-plus</v-icon>
            Add brand
        </v-btn>
    </v-container>
</template>

<style scoped>
.no-brands-container {
    max-width: 200px;
}
</style>