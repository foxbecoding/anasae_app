<script lang="ts" setup>
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const Addresses = computed(() => userStore.user.addresses)
const addAddressModel = ref<boolean>(false)
const selectedAddress = ref()
const isSaving = ref<boolean>(false)
const isAddAddress = computed((): boolean => userMenuStore.isWalletAddBillingAddress)

const saveSelection = async () => {
    isSaving.value = true
    let path: string = `${config.public.API_USER_BILLING_ADDRESSES}`
    if(!isAddAddress.value){
        let found = userStore.user.billing_addresses?.find(x => x.payment_method == userMenuStore.walletSelectedPaymentMethodPk)
        path = `${config.public.API_USER_BILLING_ADDRESSES}${found?.pk}/` 
    }

    const { data, error, status } = await useApi({
        path: path,
        method: isAddAddress.value ? 'POST' : 'PUT',
        data: {
            address: selectedAddress.value.pk,
            payment_method: userMenuStore.walletSelectedPaymentMethodPk
        }
    })

    if(status.value == 'error'){
        isSaving.value = false
        console.log(error.value)
        return
    }
    userStore.user = data.value
    if(!isAddAddress.value || userMenuStore.walletSelectedPaymentMethod){
        const { data: pm } = await useApi({
            path: `${config.public.API_USER_PAYMENT_METHODS}${userMenuStore.walletSelectedPaymentMethodPk}/`, 
            method: 'GET',
            key: `payment-methods-single`
        })
        userMenuStore.walletSelectedPaymentMethod = pm.value[0]
    }
    isSaving.value = false
    useSnackbarStore().setSnackbar('Billing address saved', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Select a billing address">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = userMenuStore.walletPreviousView"
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
        <v-list-subheader>
            <v-btn 
                @click="addAddressModel = true"
                color="primary-alt" 
                variant="text" 
                size="small"
            >add an address</v-btn>
        </v-list-subheader>
        <v-radio-group v-model="selectedAddress">
            <v-list-item
                v-for="(address, i) in Addresses"
                density="compact"
                :key="address.pk"
                :value="address"
                @click="selectedAddress = address"
                :title="address.street_address"
                :subtitle="`${address.city}, ${ address.state } ${ address.postal_code }, ${ address.country }`"
            >
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-radio color="primary-alt" :value="address"></v-radio>
                    </v-list-item-action>
                </template>
            </v-list-item>
        </v-radio-group>
        <v-container v-show="selectedAddress" class="py-0">
            <v-btn 
                @click="saveSelection()"
                class="text-surface" 
                color="primary-alt" 
                rounded="pill"
                :loading="isSaving"
                :disabled="isSaving" 
                block 
                flat
            >
                save
            </v-btn>
        </v-container>
    </v-list>
    <v-container class="no-addresses-container" v-else>
        <div class="text-center">
            <v-icon color="primary-alt" size="60">mdi-map-marker</v-icon>
            <p class="text-body-1 py-2">Add an address</p>
        </div>  
        <v-btn 
            @click="addAddressModel = true"
            class="text-surface mt-4" 
            color="primary-alt" 
            rounded="pill" 
            block 
            flat
        >
            Add an address
        </v-btn>
    </v-container> 
    <UserMenuAccountAddressesForm 
        v-if="addAddressModel" 
        v-model="addAddressModel" 
        @update:modelValue="addAddressModel = false" 
        modeType="billing"
    />
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>