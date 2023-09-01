<script lang="ts" setup>
import { UserMenuAccount, UserMenuAccountAddressesAdd } from '../../components'
import { useUserStore, useUserMenuStore } from '@/store'

const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const Addresses = computed(() => userStore.user.addresses)
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Manage addresses">
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
    <v-list>
        {{ Addresses }}
    </v-list>
    <v-container>
        <v-btn 
            @click="userMenuStore.selectedView = UserMenuAccountAddressesAdd"
            class="text-surface" 
            color="primary-alt" 
            rounded="pill" 
            block 
            flat
        >
            Add address
        </v-btn>
    </v-container>
</template>