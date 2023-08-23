<script lang="ts" setup>
import { useUserMenuStore, useUserStore } from '@/store'
import { UserMenuBrandsAdd } from '../components'

const userMenuStore = useUserMenuStore()
const userStore = useUserStore()

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
    <v-container 
        v-if="userStore.user.brands && userStore.user.brands.length === 0" 
        class="no-brands-container" 
    >
        <div class="text-center no-brands-content">
            <v-icon color="primary-alt" size="60">mdi-storefront-outline</v-icon>
            <p class="text-body-1 py-4">Add your brand and start selling today!</p>
            <v-btn 
                color="primary-alt text-surface" 
                rounded="pill" 
                flat
                @click="userMenuStore.selectedView = UserMenuBrandsAdd"
            >
                <v-icon>mdi-plus</v-icon>
                Add brand
            </v-btn>
        </div>
    </v-container>    
</template>

<style scoped>
.no-brands-container {
    position: relative;
    min-height: 200px;
}
.no-brands-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>