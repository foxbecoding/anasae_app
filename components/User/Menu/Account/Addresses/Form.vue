<script lang="ts" setup>
import { FormTextField, FormButton, UserAddress } from '@/utils/types'
import { useDisplay, useTheme } from 'vuetify'
import { useUserStore, useSnackbarStore, useUserMenuStore } from '@/store'
import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js"
import { PropType } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },

    address: {
        type: Object as PropType<UserAddress>,
        required: false
    }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'addressUpdated', value: UserAddress): void
}>()

const config = useRuntimeConfig()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore() 
const userMenuStore = useUserMenuStore()
const vTheme = useTheme()
const stripeFormLoaded = ref<boolean>(false)
const isSubmitReady = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const formError = reactive({ isError: false, message:'' })
const formData = reactive({
    full_name: props.address ? props.address.full_name : '',
    phone_number: props.address ? props.address.phone_number : '',
    street_address: props.address ? props.address.street_address : '',
    street_address_ext: props.address ? props.address.street_address_ext : '',
    state: props.address ? props.address.state : '',
    city: props.address ? props.address.city : '',
    postal_code: props.address ? props.address.postal_code : '',
    country: props.address ? props.address.country : 'US',
})

const { data } = await useApi({path: `${config.public.API_USER_ADDRESSES}`, method: 'GET'})

const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const ApiPath = computed(() => `${config.public.API_USER_ADDRESSES}${props.address ? props.address.pk+'/' : ''}`)

const formButton = reactive<FormButton>({
    show: true,
    label: 'Submit',
    class: "text-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        id: 1, 
        model: formData.full_name, 
        name:'full_name', 
        class: `pr-1 w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'Full name', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text', 
        counter: 50,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Full name is required',
            (v: any) => v.length <= 50 || 'Must be 50 characters or less'
        ]
    },
    {
        id: 2, 
        model: formData.phone_number, 
        name:'phone_number', 
        class: `w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'Phone number', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Phone number is required',
        ]
    },
    {
        id: 3, 
        model: formData.street_address, 
        name:'street_address', 
        class: `pr-1 w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'Street address', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Street address is required',
        ]
    },
    {
        id: 4, 
        model: formData.street_address_ext, 
        name:'street_address_ext', 
        class: `w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'Street address ext', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined'
    },
    {
        id: 5, 
        model: 'United States', 
        class: `pr-1 w-${!IsFullscreen.value ? '50' : '100'}`,
        name:'country', 
        label: 'Country', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        disabled: true
    },
    {
        id: 6, 
        model: formData.state, 
        name:'state', 
        class: `w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'State', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'State is required',
        ]
    },
    {
        id: 7, 
        model: formData.city, 
        name:'city', 
        class: `pr-1 w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'City', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'City is required',
        ]
    },
    {
        id: 8, 
        model: formData.postal_code, 
        name:'postal_code', 
        class: `w-${!IsFullscreen.value ? '50' : '100'}`,
        label: 'Postal code', 
        density: 'compact',
        color: 'primary-alt',
        type: 'text',
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Postal code is required',
        ]
    }
])

const submit = async (): Promise<void> => {
    isSubmitting.value = true
    const {data, status, error } = await useApi({
        path: ApiPath.value, 
        method: `${props.address ? 'PUT': 'POST'}`,
        data: formData
    })
    if (status.value == 'error'){
        if('errors' in error.value.data){
            formError.isError = true
            let errors: string[] = error.value.data.errors
            formError.message = errors.toString()
        }else{
            let allErrors: any[] = []
            formError.isError = true
            fields.value.map(x => {
                if(x.name && x.name in error.value.data){ 
                    let errors: string[] = error.value.data[x.name]
                    allErrors.push(errors.toString()) 
                }
            })
            formError.message = allErrors.toString()
        }
        isSubmitting.value = false
        return 
    }

    formError.isError = false
    formError.message = ''
    userStore.user = data.value
    emit('update:modelValue', false)
    if(props.address){
        let foundAddress = userStore.user.addresses?.find(x => x.pk == props.address?.pk) as UserAddress
        emit('addressUpdated', foundAddress)
    }
    isSubmitting.value = false
    snackbarStore.setSnackbar(`Address ${props.address ? 'updated' : 'added'}`, true)
}

const loadStripeModal = async (client_secret: string): Promise<void> => {
    let res = await loadStripe(`${config.public.STRIPE_PUBLISHABLE_KEY}`)
    let stripe = res as Stripe

    const appearance = {
        theme: 'flat',

        variables: {
            colorPrimary: vTheme.current.value.colors['primary-alt'],
            colorBackground: vTheme.current.value.colors['stripe-form-field-flat'],
            colorText: vTheme.current.value.colors['on-surface'],
            colorDanger: vTheme.current.value.colors.error,
            fontFamily: 'Roboto, Ideal Sans, system-ui, sans-serif',
            spacingUnit: '2px',
            borderRadius: '4px'
        },
        rules: {
            '.Input:focus': {
                borderColor: `${vTheme.current.value.colors['primary-alt']}`
            }

            // See all supported class names and selector syntax below
        }
    };

    const options: any = { clientSecret: client_secret, appearance }

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
    const elements: StripeElements = stripe.elements(options);

    // Create and mount Address Element
    const addressElement = elements.create('address', {
        mode: "shipping",
        fields: {
            phone: 'always',
        },
        validation: {
            phone: {
                required: 'always',
            },
        },
        defaultValues: {
            name: formData.full_name,
            phone: formData.phone_number,
            address: {
                line1: formData.street_address,
                line2: formData.street_address_ext,
                city:  formData.city,
                state: formData.state,
                postal_code: formData.postal_code,
                country: formData.country
            },
        },
    });
    addressElement.mount('#address-element');
    addressElement.on('change', (event) => {
        if (event.complete){
            // Extract potentially complete address
            const address = event.value.address
            const name = event.value.name
            const phone = event.value.phone
            formData.full_name = name
            formData.phone_number = `${phone}`
            formData.city = address.city
            formData.country = address.country
            formData.street_address = address.line1
            formData.street_address_ext = address.line2 ? address.line2 : ''
            formData.postal_code = address.postal_code
            formData.state = address.state
            isSubmitReady.value = true
        }else {
            isSubmitReady.value = false
        }
    })
}

onMounted(() => {
    loadStripeModal(data.value) 
})

</script>

<template>
    <v-dialog
        v-model="props.modelValue"
        data-test-id="add-address-dialog" 
        :fullscreen="IsFullscreen"
        :width="IsFullscreen ? '600px': '500px'"
        :transition="IsFullscreen ? 'dialog-bottom-transition' : 'fade-transition'"
        persistent
        :z-index="2500"
    >
        <v-card 
            height="1000px" 
            :rounded="IsFullscreen ? 'none' : 'xl'"
            :class="IsFullscreen ? 'mobile-dialog-card' : ''"
        >
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn 
                        @click="emit('update:modelValue', false)" 
                        color="transparent" 
                        size="small" 
                        icon
                    >
                        <v-icon icon="mdi-close" />
                    </v-btn> 
                    
                    <div class="auth-form-logo-container w-100 mr-4"> 
                        <Logo /> 
                    </div>
                </div>
                <v-card-title class="text-h5 py-4">
                    {{ props.address ? 'Edit' : 'Add'}} Address
                </v-card-title>
                <v-card-text>
                    <form id="address-form">
                        <div id="address-element">
                            <!-- Elements will create form elements here -->
                        </div>
                    </form>
                    <v-btn
                        @click="submit()"
                        class="mt-4"
                        rounded="pill" 
                        color="primary" 
                        :loading="isSubmitting"
                        :disabled="isSubmitting || !isSubmitReady"
                        block 
                        flat
                    >
                        Submit
                    </v-btn>
                    <v-alert
                        v-model="formError.isError"
                        :closable="true"
                        class="mt-4"
                        type="error"
                        title="Something went wrong"
                        rounded="lg"
                        :text="formError.message"
                        :icon="false"
                    />
                </v-card-text>
                <v-alert
                    v-model="formError.isError"
                    :closable="true"
                    class="mt-4"
                    type="error"
                    title="Something went wrong"
                    rounded="xl"
                    :text="formError.message"
                    :icon="false"
                />
            </v-container>
        </v-card>
    </v-dialog>
</template>