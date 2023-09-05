<script lang="ts" setup>
import { UserMenuAccountPaymentMethods, UserMenuAccountPaymentMethodsAddBillingAddress } from '../../components'
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'
import { ApiData } from '@/utils/types'
import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js"
import { useTheme } from 'vuetify'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const snackbarStore = useSnackbarStore()
const formError = reactive({ isError: false, message:'' })
const vTheme = useTheme()
const stripeFormLoaded = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const apiData = {path: `${config.public.API_USER_PAYMENT_METHODS}`, method: 'GET'} as ApiData
const {data, error, status, pending} = await useApi(apiData)

const set_method = (cardElement: StripeCardElement, stripe: Stripe, clientSecret: string): void => {
    let cardForm = document.getElementById('card-form') as HTMLElement; 
    stripeFormLoaded.value = true
    cardForm.addEventListener('submit', async function(ev) {
        isSubmitting.value = true
        ev.preventDefault();
        let result = await stripe.confirmCardSetup(
            clientSecret,
            {
                payment_method: {
                    card: cardElement
                },
            }
        )
        
        if (result.error) {
            // Display error.message in your UI.
            isSubmitting.value = false
            formError.isError = true
            formError.message = `${result.error.message}` 
        } else {
            //The setup has succeeded. Display a success message.
            let apiData: ApiData = {
                path: `${config.public.API_USER_PAYMENT_METHODS}`,
                method: 'POST',
                data: {payment_method_id: result.setupIntent.payment_method}
            }
            const { data, error } = await useApi(apiData)
            if(error.value){
                console.log(error.value)
                return
            }
            userStore.user = data.value
            let foundMethod = data.value.payment_methods.find((x: any) => x.stripe_pm_id == result.setupIntent?.payment_method)
            userMenuStore.selectedView = UserMenuAccountPaymentMethodsAddBillingAddress
            userMenuStore.walletPreviousView = UserMenuAccountPaymentMethods
            userMenuStore.walletSelectedPaymentMethodPk = foundMethod.pk
            userMenuStore.isWalletAddBillingAddress = true
            snackbarStore.setSnackbar('Payment method added', true)
            isSubmitting.value = false
        }
    });
}

const loadStripeModal = async (client_secret: string): Promise<void> => {
    let res = await loadStripe(`${config.public.STRIPE_PUBLISHABLE_KEY}`)
    let stripe = res as Stripe

    var style = {
        base: {
            iconColor: vTheme.current.value.colors['on-surface'],
            color: vTheme.current.value.colors['on-surface'],
            backgroundColor: vTheme.current.value.colors['form-field-flat'],
            fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            lineHeight: '35px'
        },
        invalid: {
            iconColor: vTheme.current.value.colors.error,
            color: vTheme.current.value.colors.error,
        },
    }

    const options: any = { clientSecret: client_secret }

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
    const elements: StripeElements = stripe.elements(options);

    // Create and mount the Payment Element
    const cardElement = elements.create('card', {style});
    cardElement.mount('#card-element');
    
    set_method(cardElement, stripe, client_secret)
}

onMounted(() => {
    loadStripeModal(data.value)
})
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Add payment method">
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
    <v-divider v-if="!isSubmitting"/>
    <v-progress-linear
        v-else
        color="primary-alt"
        indeterminate
        height="2"
    />
    <v-container >
        <form v-show="stripeFormLoaded" id="card-form" class="rounded">
            <v-card color="form-flat-field" class="rounded">
                <div id="card-element">
                <!-- Elements will create form elements here -->
                </div>
            </v-card>
            <button class="text-background mt-4 v-btn v-btn--block v-btn--elevated bg-primary v-btn--density-default rounded-xl v-btn--size-default v-btn--variant-flat" 
                id="submit"
            >
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Add & continue</span>
            </button>
            <small class="text-medium-emphasis">
                <v-icon color="warning" size="15">mdi-lock</v-icon> 
                Your information is encrypted and secure
            </small>
            <v-alert
                v-model="formError.isError"
                :closable="true"
                class="mt-4"
                type="error"
                rounded="lg"
                :text="formError.message"
                :icon="false"
            />
        </form>
    </v-container> 
</template>

<style scoped>
.no-data-container {
    max-width: 200px;
}
</style>