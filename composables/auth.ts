import LoginForm from '@/components/Auth/LoginForm.vue'
import SignUpForm from '@/components/Auth/SignUpForm/index.vue'
import ForgotForm from '@/components/Auth/ForgotForm.vue'
import { RouteName } from '@/utils/types'

type ComponentFormType = typeof LoginForm | typeof SignUpForm | typeof ForgotForm

export const useAuthFormFactory = () => {
    const route = useRoute()
    const routeNames = ref<RouteName[]>(['auth-login', 'auth-sign-up', 'auth-forgot'])
    const components = shallowRef({
        "auth-login": LoginForm, 
        "auth-sign-up": SignUpForm, 
        "auth-forgot": ForgotForm
    })

    const ComponentForm = computed((): ComponentFormType => components.value[route.name as RouteName] )
    return { ComponentForm, routeNames }
}