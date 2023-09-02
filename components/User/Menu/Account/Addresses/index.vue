<script lang="ts" setup>
import { 
    UserMenuAccount, 
    UserMenuAccountAddressesAdd, 
    UserMenuAccountAddressesDetails 
} from '../../components'
import { useUserStore, useUserMenuStore } from '@/store'
import { UserAddress } from '@/utils/types'

const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const Addresses = computed(() => userStore.user.addresses)
const addAddressModel = ref<boolean>(false)

const viewAddressDetails = (address: UserAddress) => {
    userMenuStore.selectedAddress = address
    userMenuStore.selectedView = UserMenuAccountAddressesDetails
}

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
    
    <v-list v-if="Addresses && Addresses.length > 0" density="compact">
        <v-list-item
            v-for="(address, i) in Addresses"
            @click="viewAddressDetails(address)"
            density="compact"
            :key="address.pk"
            :value="address"
            appendIcon="mdi-chevron-right"
            :title="address.street_address"
            :subtitle="`${address.city}, ${ address.state } ${ address.postal_code }`"
        ></v-list-item>
    </v-list>
    <v-container class="no-addresses-container" v-else>
        <div class="text-center">
            <v-icon color="primary-alt" size="60">mdi-map-marker</v-icon>
            <p class="text-body-1 py-2">Add an address</p>
        </div>  
    </v-container> 
    <v-container>
        <v-btn 
            @click="addAddressModel = true"
            class="text-surface" 
            color="primary-alt" 
            rounded="pill" 
            block 
            flat
        >
            Add address
        </v-btn>
    </v-container>
    <UserMenuAccountAddressesAdd v-if="addAddressModel" v-model="addAddressModel" @update:modelValue="addAddressModel = false" />
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>