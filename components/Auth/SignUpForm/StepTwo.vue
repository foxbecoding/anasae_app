<script lang="ts" setup>
import { FormTextField, FormButton, FormSelectField, FormCustomText } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'
import monthDays from 'month-days'
import leapYearChecker from 'leap-year'

interface SelectedDOBType {
    month: number | null,
    day: number | null,
    year: number | null
}

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

// const dobDays = ref<number[]>([])
// const dobYears = ref<number[]>([])
const selectedDOB = reactive<SelectedDOBType>({
    month: null,
    day: null,
    year: null
})

const DOBYears = computed<number[]>(()  => {
    const currentYear = new Date().getFullYear()
    let startYear = currentYear - 120
    let years: number[] = []
    let leapYears: number[] = []

    while ( startYear <= currentYear ) { years.push(startYear++) }
    years.map(year => leapYearChecker(year) ? leapYears.push(year) : '')

    if(authStore.signUpForm.birth_month == 2 && authStore.signUpForm.birth_day == 29){
        authStore.signUpForm.birth_year = null
        // years.map(year => leapYearChecker(year) ? years.push(year) : '')
        return leapYears
    }
    
    return years
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

const formError = reactive({
    isError: false,
    message:''
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
    } as FormTextField,
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
    } as FormTextField,
    {
        id: 3, 
        class: 'flex-1-0-100 mt-3 mb-2',
        inputType: 'FORMTEXT',
        text: 'This information is only used as confirmation and will not be displayed publicly.'
    } as FormCustomText,
    {
        id: 4, 
        model: authStore.signUpForm.birth_month,
        name: 'birth_month',
        inputType: 'SELECT',
        class: 'flex-1-0', 
        label: "Birth Month",
        items: dobMonths.value,
        color: "primary-alt",
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Month required' ]
    } as FormSelectField,
    {
        id: 5, 
        model: authStore.signUpForm.birth_day,
        name: 'birth_day',
        inputType: 'SELECT',
        class: 'flex-1-0 px-1', 
        label: "Birth Day",
        items: DOBDays.value,
        color: "primary-alt",
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Day required' ]
    } as FormSelectField,
    {
        id: 6, 
        model: authStore.signUpForm.birth_year,
        name: 'birth_year',
        inputType: 'SELECT',
        class: 'flex-1-0', 
        label: "Birth Year",
        items: DOBYears.value,
        color: "primary-alt",
        variant: 'outlined',
        rules: [ (v: any) => !! v || 'Year required' ]
    } as FormSelectField
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

const updatedEmitter = <T>(e: T[]): void => {
    const keys: string[] = ['birth_month', 'birth_day', 'birth_year']
    let [ birth_month, birth_day, birth_year ] = e.filter((e: any) => keys.includes(e.name))
    console.log(birth_month, birth_day, birth_year)
}

// const setDOBData = async () => { 
//     const currentYear = new Date().getFullYear()
//     let startYear = currentYear - 120
//     let startDay = 1
//     let endDay = 31
//     const setData = (start: number, end: number, arr: number[]) => {
//         let count = start
//         while ( count <= end ) {
//             arr.push(count++);
//         }  
//     } 
//     await setData(startYear, currentYear, dobYears.value)
//     dobYears.value.reverse()
//     setData(startDay, endDay, dobDays.value)
    
//     // let days = monthDays({month: 11})
//     // years.map(year => leapYearChecker(year) ? dobYears.value.push(year) : '')
//     // console.log(leapYears)
// }


onMounted(async () => {
    // await setDOBData()
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