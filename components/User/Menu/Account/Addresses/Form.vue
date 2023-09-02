<script lang="ts" setup>
import { FormTextField, FormButton, UserAddress } from '@/utils/types'
import { useDisplay } from 'vuetify'
import { useUserStore, useSnackbarStore, useUserMenuStore } from '@/store'
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
}>()

const config = useRuntimeConfig()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore() 
const userMenuStore = useUserMenuStore()
const formError = reactive({ isError: false, message:'' })
const formData = reactive({
    full_name: props.address ? props.address.full_name : '',
    phone_number: props.address ? props.address.phone_number : '',
    street_address: props.address ? props.address.street_address : '',
    street_address_ext: props.address ? props.address.street_address_ext : '',
    state: props.address ? props.address.state : '',
    city: props.address ? props.address.city : '',
    postal_code: props.address ? props.address.postal_code : ''
})
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 

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
        model: '', 
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
        model: '', 
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
        model: '', 
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
        model: '', 
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
        model: '', 
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
        model: '', 
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
    },
])

const submitEmitter = (e: any): void => {
    if (e.status == 'error'){
        if('errors' in e.error.data){
            formError.isError = true
            let errors: string[] = e.error.data.errors
            formError.message = errors.toString()
        }else{
            fields.value.map(x => {
                if(x.name && x.name in e.error.data){ 
                    let errors: string[] = e.error.data[x.name]
                    x.errorMessages = errors
                }
            })
        }
        return 
    }

    fields.value.map(x =>  x.errorMessages = '')
    formError.isError = false
    formError.message = ''
    userStore.user = e.data
    emit('update:modelValue', false)
    snackbarStore.setSnackbar('Address added', true)
}

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
                    {{ props.address ? 'Edit Address' : 'Add Address'}}
                </v-card-title>
                <v-card-text>
                    <FormFields
                        @submit="submitEmitter"
                        :fields="fields" 
                        :formButton="formButton"
                        :apiPath="`${config.public.API_USER_ADDRESSES}`"
                        apiMethod="POST"
                        formClass="d-flex flex-wrap"
                    />
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