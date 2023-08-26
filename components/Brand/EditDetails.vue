<script lang="ts" setup>
import { FormTextField, FormButton } from '@/utils/types'
import { useDisplay } from 'vuetify'
import { useSnackbarStore } from '@/store'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const config = useRuntimeConfig()
const route = useRoute()
const snackbarStore = useSnackbarStore() 
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
const formError = reactive({ isError: false, message:'' })

const { data: cacheData } = useNuxtData(`${route.params.uid}`)

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
        model: cacheData.value.name || '', 
        name:'name', 
        label: 'Brand name', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        counter: 30,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Brand name is required',
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ],
    },
    
    {
        id: 2, 
        model: cacheData.value.bio || '', 
        name:'bio', 
        label: 'Bio', 
        density: 'comfortable',
        color: 'primary-alt',
        type: 'text', 
        counter: 300,
        errorMessages: '',
        inputType: 'TEXTAREA',
        variant: 'outlined',
        rules: [ 
            (v: any) => !! v || 'Bio is required',
            (v: any) => v.length <= 300 || 'Must be 300 characters or less'
        ],
    }
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
    close()
    snackbarStore.setSnackbar('Brand edited', true)
}

</script>

<template>
    <v-dialog
        v-model="props.modelValue"
        data-test-id="brand-edit-dialog" 
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
                    Edit Brand
                </v-card-title>
                <v-card-text>
                    <FormFields
                        @submit="submitEmitter"
                        :fields="fields" 
                        :formButton="formButton"
                        :apiPath="`${config.public.API_BRAND}/${cacheData.pk}/`"
                        apiMethod="PUT"
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