import LoginForm from '@/components/Auth/LoginForm.vue'
import SignUpForm from '@/components/Auth/SignUpForm/index.vue'
import ForgotForm from '@/components/Auth/ForgotForm.vue'
import { RouteName } from '@/utils/types'

type ComponentFormType = typeof LoginForm | typeof SignUpForm | typeof ForgotForm
type FormTitleType = 'Login' | 'Sign Up' | 'Forgot Password'

export const useAuthFormFactory = () => {
    const route = useRoute()
    const routeNames = shallowRef<RouteName[]>(['auth-login', 'auth-sign-up', 'auth-forgot'])
    const components = shallowRef({
        "auth-login": LoginForm, 
        "auth-sign-up": SignUpForm, 
        "auth-forgot": ForgotForm
    })

    const ComponentForm = computed((): ComponentFormType => components.value[route.name as RouteName] )
    const FormTitle = computed((): FormTitleType => {
        let title = '' as FormTitleType
        switch (route.name as RouteName) {
            case 'auth-login':
                title = 'Login'
                break;
            case 'auth-sign-up':
                title = 'Sign Up'
                break;
            case 'auth-forgot':
                title = 'Forgot Password'
                break;
            default:
                break;
        }
        return title
    })

    return { ComponentForm, FormTitle, routeNames }
}