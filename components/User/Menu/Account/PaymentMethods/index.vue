<script lang="ts" setup>
import {  UserMenuAccount, UserMenuAccountPaymentMethodsAdd } from '../../components'
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const paymentMethods = ref<any>([])
const refreshApi = ref<Function>()
const paymentMethodDeleteDialog = ref<boolean>(false)
const selectedPaymentMethod = ref<number>(0)

if(userStore.user.payment_methods && userStore.user.payment_methods.length > 0){
    let pks = userStore.user.payment_methods.map(x => x.pk).toString()
    const {data, refresh} = await useApi({path: `${config.public.API_USER_PAYMENT_METHODS}${pks}/`, method: 'GET'})
    paymentMethods.value = data.value
}

const HasPaymentMethods = computed(() => userStore.user.payment_methods && userStore.user.payment_methods.length > 0)

const openDeleteDialog = (key: number): void => {
    selectedPaymentMethod.value = key
    paymentMethodDeleteDialog.value = true
}

const deletePaymentMethod = async (): Promise<void> => {
    if(userStore.user.payment_methods){
        let pk = userStore.user.payment_methods[selectedPaymentMethod.value].pk 
        const { data: user } = await useApi({path: `${config.public.API_USER_PAYMENT_METHODS}${pk}/`, method: 'DELETE'})
        userStore.user = user.value
        if(userStore.user.payment_methods && userStore.user.payment_methods.length > 0){
            let pks = userStore.user.payment_methods.map(x => x.pk).toString()
            const {data} = await useApi({path: `${config.public.API_USER_PAYMENT_METHODS}${pks}/`, method: 'GET'})
            paymentMethods.value = data.value
        }else{
            paymentMethods.value = []
        }
    }
    paymentMethodDeleteDialog.value = false
    useSnackbarStore().setSnackbar('Payment method deleted', true)

}

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
    
    <v-list v-if="HasPaymentMethods" density="compact">
        <v-list-item
            v-for="(method, i) in paymentMethods"
            density="compact"
            :key="i"
            :title="`${method.card.brand} ${method.card.last4}....`"
            :subtitle="`${method.card.exp_month}/${ method.card.exp_year }`"
        >
            <template v-slot:append>
              <v-btn
                @click="openDeleteDialog(i)"
                size="small"
                variant="text"
                color="error"
                icon="mdi-delete"
              />
            </template>
        </v-list-item>
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
    <v-dialog
        v-model="paymentMethodDeleteDialog"
        maxWidth="300px"
    >
        <v-card>
            <v-card-title>Deleting payment method?</v-card-title>
            <v-card-actions>
                <v-btn  @click="paymentMethodDeleteDialog = false">Cancel</v-btn>
                <v-btn color="error" @click="deletePaymentMethod()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.no-data-container {
    max-width: 200px;
}
</style>