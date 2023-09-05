<script lang="ts" setup>
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'
import { 
    UserMenuAccountPaymentMethodsAddBillingAddress,
    UserMenuAccountPaymentMethods,
    UserMenuAccountPaymentMethodsDetails,
 } from '../../components'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const PaymentMethod = computed(() => userMenuStore.walletSelectedPaymentMethod)
const deleteDialog = ref<boolean>(false)
const isDeleting = ref<boolean>(false)

const changeAddress = (isAdd: boolean = false): void => {
    let foundMethod = userStore.user.payment_methods?.find(x => x.stripe_pm_id == PaymentMethod.value.id)
    userMenuStore.selectedView = UserMenuAccountPaymentMethodsAddBillingAddress
    userMenuStore.walletPreviousView = UserMenuAccountPaymentMethodsDetails
    userMenuStore.walletSelectedPaymentMethodPk = foundMethod?.pk
    userMenuStore.isWalletAddBillingAddress = isAdd
}

const deletePaymentMethod = async (): Promise<void> => {
    isDeleting.value = true
    if(userStore.user.payment_methods){
        let pk = userStore.user.payment_methods?.find(x => x.stripe_pm_id == PaymentMethod.value.id)?.pk
        const { data: user } = await useApi({path: `${config.public.API_USER_PAYMENT_METHODS}${pk}/`, method: 'DELETE'})
        userStore.user = user.value
    }
    isDeleting.value = false
    deleteDialog.value = false
    userMenuStore.selectedView = UserMenuAccountPaymentMethods
    useSnackbarStore().setSnackbar('Payment method deleted', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Payment method details">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuAccountPaymentMethods"
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
            density="compact"
            :title="`${PaymentMethod.card.brand} ....${PaymentMethod.card.last4}`"
            :subtitle="`${PaymentMethod.card.exp_month}/${ PaymentMethod.card.exp_year }`"
        >
        </v-list-item>
    </v-list>
    <v-card color="surface">
        <v-card-title>Billing address</v-card-title>
        <v-card-text v-if="PaymentMethod.billing_details.address.line1">
            {{ PaymentMethod.billing_details.name }}<br>
            {{ PaymentMethod.billing_details.address.line1 }} <br>
            {{ PaymentMethod.billing_details.address.line2 ? PaymentMethod.billing_details.address.line2 : '' }} 
            <br v-if="PaymentMethod.billing_details.address.line2">
            {{ PaymentMethod.billing_details.address.city }}, 
            {{ PaymentMethod.billing_details.address.state }} 
            {{ PaymentMethod.billing_details.address.postal_code }}, 
            {{ PaymentMethod.billing_details.country }}<br>
            Phone number: {{ PaymentMethod.billing_details.phone }}
            <v-btn @click="changeAddress()" color="warning" size="small" flat>Change address</v-btn>
        </v-card-text>
        <v-card-text v-else>
            <v-btn 
                @click="changeAddress(true)"
                color="primary-alt" 
                class="text-surface" 
                size="small" 
                flat
            >
                Add an address
            </v-btn>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="deleteDialog = true" color="error" flat>Remove</v-btn>
        </v-card-actions>
    </v-card>
    <v-dialog
        v-model="deleteDialog"
        maxWidth="300px"
    >
        <v-card>
            <v-card-title>Deleting payment method?</v-card-title>
            <v-card-actions>
                <v-btn  @click="deleteDialog = false" :disabled="isDeleting">Cancel</v-btn>
                <v-btn color="error" :loading="isDeleting" :disabled="isDeleting" @click="deletePaymentMethod()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>