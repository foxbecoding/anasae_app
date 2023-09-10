import LoginForm from '@/components/Auth/LoginForm.vue'
import SignUpForm from '@/components/Auth/SignUpForm/index.vue'
import ForgotForm from '@/components/Auth/ForgotForm.vue'
import Home from '@/pages/index.vue'
import SellOnAnasae from '@/pages/sell-on-anasae.vue'
import Clipz from '@/pages/clipz.vue'
import Search from '@/pages/search.vue'
import Cart from '@/pages/cart.vue'
import Profile from '@/pages/profile/index.vue'
import ProfileUID from '@/pages/profile/[uid].vue'
import Brand from '@/pages/brand/index.vue' 
import BrandUID from '@/pages/brand/[uid].vue' 
import { AuthRouteName as RouteName } from '@/utils/types'
import { useAuthStore } from '@/store/Auth'

export const useAuthFormFactory = () => {
    type ComponentFormType = typeof LoginForm | typeof SignUpForm | typeof ForgotForm
    type FormTitle = 'Login' | 'Sign Up' | 'Forgot Password'

    const route = useRoute()
    const authRouteNames = shallowRef<RouteName[]>(['auth-login', 'auth-sign-up', 'auth-forgot-password'])
    const components = shallowReactive({
        "auth-login": LoginForm, 
        "auth-sign-up": SignUpForm, 
        "auth-forgot-password": ForgotForm
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
            case 'auth-forgot-password':
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
    const compType = () => Home
    type PageComponentType = ReturnType<typeof compType>
    const authStore = useAuthStore()
 
    const PageComponent = computed((): PageComponentType => {
        let component 
        switch (authStore.prevRouteName) {
            case 'index':
                component = Home  
                break;
            case 'clipz':
                component = Clipz  
                break;
            case 'search':
                component = Search  
                break;
            case 'cart':
                component = Cart  
                break;
            case 'profile':
                component = Profile  
                break;
            case 'profile-uid':
                component = ProfileUID  
                break;
            case 'brand':
                component = Brand
                break;
            case 'brand-uid':
                component = BrandUID  
                break;
            case 'sell-on-anasae':
                component = SellOnAnasae  
                break;
            default:
                component = Home
                break;
        }
        return component 
    })

    return { PageComponent }
}