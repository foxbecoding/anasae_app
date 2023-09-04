<script lang="ts" setup>
import { UserMenuAccountAddresses } from '../../components'
import { UserAddress } from '@/utils/types'
import { useUserMenuStore, useSnackbarStore, useUserStore } from '@/store'

const config = useRuntimeConfig()
const userMenuStore = useUserMenuStore()
const addressDialog = ref<boolean>(false)
const addressDeleteDialog = ref<boolean>(false)

const updateAddress = (e: UserAddress): void => {
    userMenuStore.selectedAddress = e
}

const deleteAddress = async (): Promise<void> => {
    const { data } = await useApi({
        method: 'DELETE', 
        path: `${config.public.API_USER_ADDRESSES}${userMenuStore.selectedAddress?.pk}/`
    })
    useUserStore().user = data.value
    userMenuStore.selectedView = UserMenuAccountAddresses
    useSnackbarStore().setSnackbar('Address deleted', true)
}
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Address Details">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuAccountAddresses"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-card color="surface">
        <v-card-title>{{ userMenuStore.selectedAddress?.full_name }}</v-card-title>
        <v-card-text>
            {{ userMenuStore.selectedAddress?.street_address }} <br>
            {{ userMenuStore.selectedAddress?.city }}, 
            {{ userMenuStore.selectedAddress?.state }} 
            {{ userMenuStore.selectedAddress?.postal_code }}, 
            {{ userMenuStore.selectedAddress?.country }}<br>
            Phone number: {{ userMenuStore.selectedAddress?.phone_number }}
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="addressDialog = true" flat>Edit</v-btn>
            <v-btn color="error"  @click="addressDeleteDialog = true" flat>Remove</v-btn>
        </v-card-actions>
    </v-card>
    <UserMenuAccountAddressesForm 
        v-if="addressDialog" 
        v-model="addressDialog" 
        @update:modelValue="addressDialog = false" 
        @addressUpdated="updateAddress"
        :address="userMenuStore.selectedAddress"
    />
    <v-dialog
        v-model="addressDeleteDialog"
        maxWidth="300px"
    >
        <v-card>
            <v-card-title>Deleting address?</v-card-title>
            <v-card-actions>
                <v-btn  @click="addressDeleteDialog = false">Cancel</v-btn>
                <v-btn color="error" @click="deleteAddress">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>