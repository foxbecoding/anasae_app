<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import UserMenuBrands  from './index.vue'

const userMenuStore = useUserMenuStore()

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Add brand">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuBrands"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-container>
        FORM HERE
    </v-container>    
</template>

