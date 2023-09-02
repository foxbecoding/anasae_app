<script lang="ts" setup>
import { UserMenuAccountPaymentMethods } from '../../components'
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'
import { ApiData } from '@/utils/types'
import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js"

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()
const snackbarStore = useSnackbarStore()
const PaymentMethods = computed(() => userStore.user.payment_methods)
const addPaymentMethod = ref<boolean>(false)

const apiData = {path: `${config.public.API_USER_PAYMENT_METHODS}`, method: 'GET'} as ApiData
const {data, error, status, pending} = await useApi(apiData)

const set_method = (cardElement: StripeCardElement, stripe: Stripe, clientSecret: string): void => {
    let cardForm = document.getElementById('card-form') as HTMLElement; 
    
    cardForm.addEventListener('submit', async function(ev) {
        ev.preventDefault();
        let result = await stripe.confirmCardSetup(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                },
            }
        )
        
        if (result.error) {
            console.log(result.error)
            // Display error.message in your UI.
        } else {
            console.log(result)
            // // The setup has succeeded. Display a success message.
            // let apiData: ApiData = {
            //     path: `${config.public.API_USER_PAYMENT_METHODS}`,
            //     method: 'POST',
            //     data: {'payment_method_id': self.setup_intent_confirm_res.payment_method}
            // }
            // const { data, error } = await useApi(apiData)
            // if(error.value){
            //     console.log(error.value)
            //     return
            // }
            snackbarStore.setSnackbar('Payment method added', true)
        }
    });
}

const loadStripeModal = async (client_secret: string): Promise<void> => {
    let res = await loadStripe(`${config.public.STRIPE_PUBLISHABLE_KEY}`)
    let stripe = res as Stripe

    const options: any = {
        clientSecret: client_secret,
        // Fully customizable with appearance API.
        appearance: {
            theme: 'night',
        },
    };

    var style = {
        base: {
        fontSize: "15px",
        color: "#fff",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        fontSmoothing: "antialiased",
            "::placeholder": {
                color: "rgba(255,255,255,0.6)"
            }
        }
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
    const elements: StripeElements = stripe.elements(options);

    // Create and mount the Payment Element
    const cardElement = elements.create('card', {style});
    cardElement.mount('#card-element');
    
    set_method(cardElement, stripe, client_secret)
}

loadStripeModal(data.value)
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
    <v-divider />
    <v-container >
        <form id="card-form">
            <div id="card-element">
            <!-- Elements will create form elements here -->
            </div>
            <button class="text-background mt-2 v-btn v-btn--block v-btn--elevated bg-primary v-btn--density-default rounded-xl v-btn--size-default v-btn--variant-flat" 
                id="submit"
            >
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Submit</span>
            </button>
            <p id="card-error" class="text-error" role="alert">
                <!-- {{ addPaymentMethodError }} -->
            </p>
        </form>
    </v-container> 
 
</template>

<style scoped>
.no-data-container {
    max-width: 200px;
}
</style>