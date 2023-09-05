<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { UserMenuAccount } from '@/components/User/Menu/components'
import { FormTextField, FormButton } from '@/utils/types'
import { useUserStore, useSnackbarStore, useAuthStore } from '@/store'

const config = useRuntimeConfig()
const snackbarStore = useSnackbarStore() 
const userMenuStore = useUserMenuStore()
const formError = reactive({ isError: false, message:'' })

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
        bgColor: 'form-field-flat',
        flat: true,
        id: 1, 
        model: '', 
        class: 'flex-1-0-100',
        density: 'comfortable',
        name:'password', 
        label: 'Password', 
        color: 'primary',
        type: 'password', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        prependInnerIcon: 'mdi-lock',
        appendInnerIcon: 'mdi-eye',
        appendInnerIconColor: 'primary-alt',
        appendInnerIconFunction: function(){
            if(this.appendInnerIcon == 'mdi-eye'){
                this.appendInnerIcon = 'mdi-eye-off'
                this.type = 'text'
            }else{
                this.appendInnerIcon = 'mdi-eye'
                this.type = 'password'
            }
        },
        rules: [ (v: any) => !! v || 'Password is required' ]
    } as FormTextField,
    {
        bgColor: 'form-field-flat',
        flat: true,
        id: 2, 
        model: '', 
        class: 'flex-1-0-100',
        density: 'comfortable',
        name:'confirm_password', 
        label: 'Confirm password', 
        color: 'primary',
        type: 'password', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        prependInnerIcon: 'mdi-lock',
        appendInnerIcon: 'mdi-eye',
        appendInnerIconColor: 'primary-alt',
        appendInnerIconFunction: function(){
            if(this.appendInnerIcon == 'mdi-eye'){
                this.appendInnerIcon = 'mdi-eye-off'
                this.type = 'text'
            }else{
                this.appendInnerIcon = 'mdi-eye'
                this.type = 'password'
            }
        },
        rules: [ (v: any) => !! v || 'Confirm password is required' ]
    } as FormTextField,
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
    useAuthStore().clear()
    snackbarStore.setSnackbar('Account password updated', true)
}

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Change password">
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
        <v-container>
            <FormFields
                @submit="submitEmitter"
                :fields="fields" 
                :formButton="formButton"
                :apiPath="`${config.public.API_USER}/${useUserStore().user.pk}/`"
                apiMethod="PATCH"
            />
            <v-alert
                class="mt-4"
                rounded="lg"
                density="compact"
                type="warning"
                text="By updating your password you will have to sign in again."
            />
            <v-alert
                v-model="formError.isError"
                :closable="true"
                class="mt-4"
                type="error"
                title=""
                rounded="lg"
                :text="formError.message"
                :icon="false"
            />
        </v-container>
    </v-list>
</template>