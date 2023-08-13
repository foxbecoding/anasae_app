<script lang="ts" setup>
import { FormTextField, FormButton, FormSelectField, FormCustomText } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'
import monthDays from 'month-days'
import leapYearChecker from 'leap-year'

const config = useRuntimeConfig()
const apiPath = shallowRef<string>(config.public.API_AUTH_VALIDATE_DETAILS) 
const apiMethod = 'POST'
const authStore = useAuthStore()
const dobMonths = shallowRef([
    {id: 0, title: 'January', value: 1},
    {id: 1, title: 'February', value: 2},
    {id: 2, title: 'March', value: 3},
    {id: 3, title: 'April', value: 4},
    {id: 4, title: 'May', value: 5},
    {id: 5, title: 'June', value: 6},
    {id: 6, title: 'July', value: 7},
    {id: 7, title: 'August', value: 8},
    {id: 8, title: 'September', value: 9},
    {id: 9, title: 'October', value: 10},
    {id: 10, title: 'November', value: 11},
    {id: 11, title: 'December', value: 12},
])

const DOBYears = computed<number[]>(()  => {
    const currentYear = new Date().getFullYear()
    let startYear = currentYear - 120
    let years: number[] = []
    let leapYears: number[] = []

    while ( startYear <= currentYear ) { years.push(startYear++) }
    years.map(year => leapYearChecker(year) ? leapYears.push(year) : '')

    if(authStore.signUpForm.birth_month == 2 && authStore.signUpForm.birth_day == 29){
        authStore.signUpForm.birth_year = null
        return leapYears.reverse()
    }
    
    return years.reverse()
})

const DOBDays = computed(() => {
    let days: number[] = []
    let startDay = 1

    if (!authStore.signUpForm.birth_month){
        let endDay = 31
        while ( startDay <= endDay ) { days.push(startDay++) }
    }else if(authStore.signUpForm.birth_month && authStore.signUpForm.birth_year) {
        let totalDays = monthDays({
            month: authStore.signUpForm.birth_month-1, 
            year: authStore.signUpForm.birth_year
        })
        while ( startDay <= totalDays ) { days.push(startDay++) }
    }else {
        let totalDays = monthDays({ month: authStore.signUpForm.birth_month-1 })
        while ( startDay <= totalDays ) { days.push(startDay++) }
    }
    return days
})

const formButton = reactive<FormButton>({
    show: true,
    label: 'Next',
    class: "text-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[] | FormSelectField[] | FormCustomText[]>([
    {
        class: 'flex-1-0-100',
        color: 'primary-alt',
        counter: 30,
        density: 'comfortable',
        errorMessages: '',
        id: 1, 
        inputType: 'TEXTFIELD',
        label: 'First name', 
        model: authStore.signUpForm.first_name, 
        name:'first_name', 
        prependInnerIcon: 'mdi-account',
        rules: [ 
            (v: any) => !! v || 'First name is required',
            (v: any) => v.length <= 30 || 'Must be 30 characters or less', 
        ],
        type: 'text', 
        variant: 'outlined'
    } as FormTextField,
    {
        class: 'flex-1-0-100',
        color: 'primary-alt',
        counter: 30,
        density: 'comfortable',
        errorMessages: '',
        id: 2, 
        inputType: 'TEXTFIELD',
        label: 'Last name', 
        model: authStore.signUpForm.last_name, 
        name:'last_name', 
        prependInnerIcon: 'mdi-account',
        rules: [ 
            (v: any) => !! v || 'Last name is required',
            (v: any) => v.length <= 30 || 'Must be 30 characters or less', 
        ],
        type: 'text', 
        variant: 'outlined'
    } as FormTextField,
    {
        class: 'flex-1-0-100', 
        color: "primary-alt",
        density: 'comfortable',
        id: 3, 
        inputType: 'SELECT',
        items: authStore.signUpFormGenderOptions,
        label: "Gender",
        model: authStore.signUpForm.gender,
        name: 'gender',
        rules: [ (v: any) => !! v || 'Gender required' ],
        variant: 'outlined'
    } as FormSelectField,
    {
        class: 'flex-1-0-100 mt-1 text-h6',
        id: 4, 
        inputType: 'FORMTEXT',
        text: 'Date of birth'
    } as FormCustomText,
    {
        class: 'flex-1-0-100 mb-2',
        id: 5, 
        inputType: 'FORMTEXT',
        text: 'Please confirm your age. This information is will not be displayed publicly.'
    } as FormCustomText,
    {
        class: 'flex-1-0-100 flex-sm-1-0', 
        color: "primary-alt",
        density: 'comfortable',
        id: 6, 
        inputType: 'SELECT',
        items: dobMonths.value,
        label: "Month",
        model: authStore.signUpForm.birth_month,
        name: 'birth_month',
        rules: [ (v: any) => !! v || 'Month required' ],
        variant: 'outlined'
    } as FormSelectField,
    {
        class: 'flex-1-0 px-1', 
        color: "primary-alt",
        density: 'comfortable',
        id: 7, 
        inputType: 'SELECT',
        items: DOBDays.value,
        label: "Day",
        model: authStore.signUpForm.birth_day,
        name: 'birth_day',
        rules: [ (v: any) => !! v || 'Day required' ],
        variant: 'outlined'
    } as FormSelectField,
    {
        class: 'flex-1-0', 
        color: "primary-alt",
        density: 'comfortable',
        id: 8, 
        inputType: 'SELECT',
        items: DOBYears.value,
        label: "Year",
        model: authStore.signUpForm.birth_year,
        name: 'birth_year',
        rules: [ (v: any) => !! v || 'Year required' ],
        variant: 'outlined'
    } as FormSelectField
]) 

const submitEmitter = (e: any): void => {
    if (e.status == 'error'){
        fields.value.map(x => {
            if(x.name && x.name in e.error.data){ 
                let errors: string[] = e.error.data[x.name]
                x.errorMessages = errors
            }
        })
        return 
    }

    authStore.signUpFormStep++
    fields.value.map(x =>  x.errorMessages = '')
}

const updatedEmitter = (e: any): void => {
    const keys: string[] = ['birth_month', 'birth_day', 'birth_year']
    let [ birth_month, birth_day, birth_year ] = e.filter((e: any) => keys.includes(e.name))
    birth_day.items = DOBDays.value
    while(birth_day.model > birth_day.items.length){
        birth_day.model--
    }
    birth_year.items = DOBYears.value
}
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