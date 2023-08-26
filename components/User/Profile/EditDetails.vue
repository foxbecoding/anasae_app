<script lang="ts" setup>
import { FormTextField, FormButton } from '@/utils/types'
import { useDisplay } from 'vuetify'
import { useUserStore, useSnackbarStore } from '@/store'

const userStore = useUserStore()
const snackbarStore = useSnackbarStore() 
const config = useRuntimeConfig()
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const formError = reactive({ isError: false, message:'' })

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

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
        model: userStore.user.username || '', 
        name:'username', 
        label: 'Username', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Username is required' ],
    },
    
    {
        id: 2, 
        model: userStore.user.first_name || '', 
        name:'first_name', 
        label: 'First name', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'First name is required' ],
    },

    {
        id: 3, 
        model: userStore.user.last_name || '', 
        name:'last_name', 
        label: 'Last name', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Last name is required' ],
    },
])

const close = async (): Promise<void> => { 
    emit('update:modelValue', false)
    setTimeout(() => { useRouter().back() }, 300) 
}

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
    close()
    snackbarStore.setSnackbar('Profile edited', true)
}

</script>

<template>
    <v-dialog
        v-model="props.modelValue"
        data-test-id="profile-edit-dialog" 
        :fullscreen="IsFullscreen"
        :width="IsFullscreen ? '600px': '500px'"
        :transition="IsFullscreen ? 'dialog-bottom-transition' : 'fade-transition'"
        persistent
    >
        <v-card 
            height="1000px" 
            :rounded="IsFullscreen ? 'none' : 'xl'"
            :class="IsFullscreen ? 'mobile-dialog-card' : ''"
        >
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn 
                        @click="close" 
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
                    Edit Profile
                </v-card-title>
                <v-card-text>
                    <FormFields
                        @submit="submitEmitter"
                        :fields="fields" 
                        :formButton="formButton"
                        :apiPath="`${config.public.API_USER}/${useUserStore().user.pk}/`"
                        apiMethod="PATCH"
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

<style scoped>
</style>