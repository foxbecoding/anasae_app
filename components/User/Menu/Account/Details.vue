<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { UserMenuAccount } from '../components.ts'

const userMenuStore = useUserMenuStore()
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Account details">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuAccount"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
</template>