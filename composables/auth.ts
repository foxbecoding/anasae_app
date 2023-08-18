import LoginForm from '@/components/Auth/LoginForm.vue'
import SignUpForm from '@/components/Auth/SignUpForm/index.vue'
import ForgotForm from '@/components/Auth/ForgotForm.vue'
import Home from '@/pages/index.vue'
import Clipz from '@/pages/clipz.vue'
import Search from '@/pages/search.vue'
import Cart from '@/pages/cart.vue'
import { AuthRouteName as RouteName } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

export const useAuthFormFactory = () => {
    type ComponentFormType = typeof LoginForm | typeof SignUpForm | typeof ForgotForm
    type FormTitle = 'Login' | 'Sign Up' | 'Forgot Password'

    const route = useRoute()
    const authRouteNames = shallowRef<RouteName[]>(['auth-login', 'auth-sign-up', 'auth-forgot'])
    const components = shallowReactive({
        "auth-login": LoginForm, 
        "auth-sign-up": SignUpForm, 
        "auth-forgot": ForgotForm
    })

    const AuthFormComponent = computed((): ComponentFormType => components[route.name as RouteName] )
    const AuthFormTitle = computed((): FormTitle => {
        let title = '' as FormTitle
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

    return { 
        AuthFormComponent, 
        AuthFormTitle, 
        authRouteNames
    }
}

export const useAuthPageFactory = () => {
    type PageComponentType = typeof Home | typeof Clipz | typeof Search | typeof Cart
    type PageName = 'index' | 'clipz' | 'search' | 'cart'
    const authStore = useAuthStore()
    const pageComponents = shallowReactive({
        "index": Home,
        "clipz": Clipz,
        "search": Search,
        "cart": Cart
    })

    const PageComponent = computed((): PageComponentType => pageComponents[authStore.prevRoute as PageName])

    return { PageComponent }
}