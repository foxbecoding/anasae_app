<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { UserMenuAccount } from '../components.ts'
import { FormTextField, FormButton } from '@/utils/types'
import { useUserStore, useSnackbarStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()

const formButton = reactive<FormButton>({
    show: true,
    label: 'Submit',
    class: "tex-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        id: 1, 
        model: userStore.user.first_name || '', 
        name:'first_name', 
        label: 'First name', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        counter: 30,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'First name is required',
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ]
    },
    {
        id: 2, 
        model: userStore.user.last_name || '', 
        name:'last_name', 
        label: 'Last name', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        counter: 30,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Last name is required', 
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ],
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
    snackbarStore.setSnackbar('Account details updated', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Account details">
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
    <v-list>
        <FormFields
            @submit="submitEmitter"
            :fields="fields" 
            :formButton="formButton"
            :apiPath="`${config.public.API_USER}/${useUserStore().user.pk}/`"
            apiMethod="PATCH"
        />
    </v-list>
</template>