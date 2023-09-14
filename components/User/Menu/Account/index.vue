<script lang="ts" setup>
import { useUserMenuStore, useAuthStore } from '@/store'
import * as accComps from '../components'
import { MenuItem } from '@/utils/types'

const userMenuStore = useUserMenuStore()
const authStore = useAuthStore()

const menuItems = ref<MenuItem[]>([
    { 
        id: 1, 
        appendIcon: 'mdi-chevron-right',
        prependIcon: 'mdi-account-details-outline',
        title: 'Details',
        action: () => { userMenuStore.selectedView = accComps.UserMenuAccountDetails }
    },
    { 
        id: 2, 
        appendIcon: 'mdi-chevron-right',
        prependIcon: 'mdi-credit-card-outline', 
        title: 'Payment methods',
        action: () => { userMenuStore.selectedView = accComps.UserMenuAccountPaymentMethods }
    },
    { 
        id: 3, 
        appendIcon: 'mdi-chevron-right',
        prependIcon: 'mdi-map-marker-outline', 
        title: 'Your addresses',
        action: () => { userMenuStore.selectedView = accComps.UserMenuAccountAddresses }
    },
    { 
        id: 4, 
        appendIcon: 'mdi-chevron-right',
        prependIcon: 'mdi-lock-outline', 
        title: 'Change password',
        action: () => { userMenuStore.selectedView = accComps.UserMenuAccountPassword }
    },
    { 
        id: 5, 
        prependIcon: 'mdi-logout-variant', 
        title: 'Sign out',
        action: () => {
            userMenuStore.isOpen = false
            authStore.signOut()
        }
    }
])
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Manage account">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.goBack()"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact">
        <v-list-item 
            v-for="(item, i) in menuItems"
            :key="i"
            :value="item"
            :title="item.title"
            @click="item?.action"
            :to="item?.to"
            :append-icon="item.appendIcon"
            :prepend-icon="item.prependIcon"
        >

        </v-list-item>
    </v-list>
    
</template>