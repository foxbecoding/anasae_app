<script lang="ts" setup>
import {  
    UserMenuAccount,
    UserMenuAccountPaymentMethods, 
    UserMenuAccountPaymentMethodsAdd, 
    UserMenuAccountPaymentMethodsDetails 
} from '../../components'
import { useUserStore, useUserMenuStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const paymentMethods = ref<any>([])

const isPending = ref<boolean>(true)

onMounted(async () => {
    if(userStore.user.payment_methods && userStore.user.payment_methods.length > 0){
        const { data: cacheData } = useNuxtData('payment-methods')
        paymentMethods.value = cacheData.value
        let pks = userStore.user.payment_methods.map(x => x.pk).toString()
        const { data, pending } = await useApi({
            path: `${config.public.API_USER_PAYMENT_METHODS}${pks}/`, 
            method: 'GET',
            key: `payment-methods`
        })
        paymentMethods.value = data.value
        isPending.value = pending.value

    }
})

const HasPaymentMethods = computed(() => userStore.user.payment_methods && userStore.user.payment_methods.length > 0)



const detailsView = (method: any): void => {
    userMenuStore.walletPreviousView = UserMenuAccountPaymentMethods
    userMenuStore.walletSelectedPaymentMethod = method
    userMenuStore.selectedView = UserMenuAccountPaymentMethodsDetails
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
    <v-divider v-if="!isPending"/>
    <v-progress-linear
        v-else
        color="primary-alt"
        indeterminate
        height="2"
    />
    <v-list v-if="HasPaymentMethods" density="compact">
        <v-list-item
            v-for="(method, i) in paymentMethods"
            density="compact"
            @click="detailsView(method)"
            :key="i"
            :title="`${method.card.brand} ....${method.card.last4}`"
            appendIcon="mdi-chevron-right"
        >
            <v-list-item-subtitle>
                <span>{{method.card.exp_month}}/{{method.card.exp_year}}</span> 
                <small class="text-error" v-if="!method.billing_details.address.line1">
                    missing billing address
                </small> 
            </v-list-item-subtitle>

        </v-list-item>
    </v-list>
    <v-container class="no-data-container" v-else>
        <div class="text-center">
            <v-icon color="primary-alt" size="60">mdi-credit-card</v-icon>
            <p class="text-body-1 py-2">Add a payment method</p>
        </div>  
    </v-container> 
    <v-container v-show="!isPending">
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