<script lang="ts" setup>
import { FormField, FormButton } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'
import monthDays from 'month-days'
import leapYearChecker from 'leap-year'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_DETAILS) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const formError = reactive({
    isError: false,
    message:''
})

const formButton = reactive<FormButton>({
    show: true,
    label: 'Next',
    class: "tex-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
})

const fields = ref<FormField[]>([
    {
        id: 1, 
        model: authStore.signUpForm.first_name, 
        class: 'flex-1-0-100',
        name:'first_name', 
        label: 'First name', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'First name is required' ]
    },
    {
        id: 2, 
        model: authStore.signUpForm.last_name, 
        class: 'flex-1-0-100',
        name:'last_name', 
        label: 'Last name', 
        color: 'primary-alt',
        type: 'text', 
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'outlined',
        prependInnerIcon: 'mdi-account',
        rules: [ (v: any) => !! v || 'Last name is required' ]
    },
    {
        id: 3, 
        class: 'flex-1-0-100 mt-3 mb-2',
        inputType: 'FORMTEXT',
        formText: 'This information is only used as confirmation and will not be displayed publicly.'
    },
    {
        id: 4, 
        model: authStore.signUpForm.birth_month,
        inputType: 'SELECT',
        class: 'flex-1-0', 
        label: "Birth Month",
        items: [],
        // itemTitle: "field.itemTitle",
        // itemValue: "field.itemValue",
        color: "primary-alt",
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Month required' ]
    },
    {
        id: 5, 
        model: authStore.signUpForm.birth_day,
        inputType: 'SELECT',
        class: 'flex-1-0 px-1', 
        label: "Birth Day",
        items: [],
        color: "primary-alt",
        variant: 'outlined'
    },
    {
        id: 6, 
        model: authStore.signUpForm.birth_year,
        inputType: 'SELECT',
        class: 'flex-1-0', 
        label: "Birth Year",
        items: [],
        color: "primary-alt",
        variant: 'outlined'
    }
])

const submitEmitter = (e: any): void => {
    authStore.signUpFormStep++
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
}

const updatedEmitter = (e: any): void => {
    console.log(e)
}

onMounted(() => {
    const months = [0,1,2,3,4,5,6,7,8,9,10,11]
    const years: number[] = []
    const leapYears: number[] = []
    const currentYear =  new Date().getFullYear()
    let startYear = currentYear - 120
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    let days = monthDays({month: 1, year: 2016})
    
    years.map(year => leapYearChecker(year) ? leapYears.push(year) : '')
    console.log(leapYears)
})
</script>

<template>
    <FormFields 
        @submit="submitEmitter"
        @updated="updatedEmitter"
        formClass="d-flex flex-wrap"
        :store="authStore.signUpForm"
        :fields="fields" 
        :formButton="formButton"
        :apiPath="apiPath"
        :apiMethod="apiMethod"
    />
</template>