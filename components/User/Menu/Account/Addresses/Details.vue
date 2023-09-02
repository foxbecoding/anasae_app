<script lang="ts" setup>
import { UserMenuAccountAddresses } from '../../components'
import { useUserMenuStore } from '@/store'

const userMenuStore = useUserMenuStore()
const addressDialog = ref<boolean>(false)

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
            {{ userMenuStore.selectedAddress?.postal_code }}<br>
            {{ userMenuStore.selectedAddress?.country }}<br>
            Phone number: {{ userMenuStore.selectedAddress?.phone_number }}
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="addressDialog = true" flat>Edit</v-btn>
            <v-btn color="error"  flat>Remove</v-btn>
        </v-card-actions>
    </v-card>
    <UserMenuAccountAddressesForm 
        v-if="addressDialog" 
        v-model="addressDialog" 
        @update:modelValue="addressDialog = false" 
        :address="userMenuStore.selectedAddress"
    />
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>