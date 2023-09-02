<script lang="ts" setup>
import { UserMenuAccountAddresses } from '../../components'
import { useUserMenuStore } from '@/store'

const userMenuStore = useUserMenuStore()

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
    </v-card>
    <v-container>
        <v-btn color="primary" rounded="pill" block flat>Edit</v-btn>
        <v-btn color="error"  class="mt-2" variant="tonal" rounded="pill" block flat>Remove</v-btn>
    </v-container>
    <!-- <UserMenuAccountAddressesAdd v-if="addAddressModel" v-model="addAddressModel" @update:modelValue="addAddressModel = false" /> -->
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>