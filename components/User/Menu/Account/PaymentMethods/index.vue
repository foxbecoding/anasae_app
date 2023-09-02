<script lang="ts" setup>
import {  UserMenuAccount, UserMenuAccountPaymentMethodsAdd } from '../../components'
import { useUserStore, useUserMenuStore } from '@/store'
import { UserAddress } from '@/utils/types'

const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const PaymentMethods = computed(() => userStore.user.payment_methods)


</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Manage payment methods">
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
    
    <v-list v-if="PaymentMethods && PaymentMethods.length > 0" density="compact">
        <!-- <v-list-item
            v-for="(method, i) in PaymentMethods"
            @click="viewAddressDetails(address)"
            density="compact"
            :key="address.pk"
            :value="address"
            appendIcon="mdi-chevron-right"
            :title="address.street_address"
            :subtitle="`${address.city}, ${ address.state } ${ address.postal_code }`"
        ></v-list-item> -->
    </v-list>
    <v-container class="no-data-container" v-else>
        <div class="text-center">
            <v-icon color="primary-alt" size="60">mdi-credit-card</v-icon>
            <p class="text-body-1 py-2">Add a payment method</p>
        </div>  
    </v-container> 
    <v-container>
        <v-btn 
            @click="userMenuStore.selectedView = UserMenuAccountPaymentMethodsAdd"
            class="text-surface" 
            color="primary-alt" 
            rounded="pill" 
            block 
            flat
        >
            Add
        </v-btn>
    </v-container>
 
</template>

<style scoped>
.no-data-container {
    max-width: 200px;
}
</style>