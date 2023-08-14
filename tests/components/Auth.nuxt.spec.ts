import { mountSuspended } from 'nuxt-vitest/utils'
import { VueWrapper } from '@vue/test-utils'
import { RouteLocationRaw, NavigationFailure, RouteRecordName } from 'vue-router';
import Auth from '@/components/Auth/index.vue'
import AuthLoginForm from '@/components/Auth/LoginForm.vue'
import AuthLoginPage from '@/pages/auth/login.vue'
import layout from '@/layouts/default.vue'

describe('Auth components', () => {

    describe('Auth component', () => {
        it('render Auth Dialog', async () => {
            const wrapper = await mountSuspended(Auth, {
                route: '/profile',
            })
            expect(wrapper.vm).toBeTruthy()
        })
    })

    // describe('AuthLoginForm component', () => {
    //     it('render AuthLoginForm', async () => {
    //         const wrapper = await mountSuspended(AuthLoginPage, { route: '/auth/login' })
    //         console.log(wrapper.html())
    //         expect(wrapper.vm).toBeTruthy()
    //     })
    // })

    // describe('Test AppBarInnerEnd Component', () => {
    //     it('renders component instance and buttons', async () => { 
    //     const wrapper = await mountSuspended(AppBarInnerEnd)
        
    //     const signInBtn = wrapper.find('[data-test-id="app-bar-inner-end-sign-btn"]')
    //     const themeToggleBtn = wrapper.find('[data-test-id="app-bar-inner-end-theme-toggle-btn"]')
    //     const cartBtn = wrapper.find('[data-test-id="app-bar-inner-end-cart-btn"]')
        
    //     expect(wrapper.vm).toBeTruthy() 
    //     expect(signInBtn).toBeTruthy()
    //     expect(themeToggleBtn).toBeTruthy()
    //     expect(cartBtn).toBeTruthy()
    //     })

    //     it('test themeToggle()', async () => {
    //     const wrapper = await mountSuspended(layout)
    //     const themeToggleBtn = wrapper.find('[data-test-id="app-bar-inner-end-theme-toggle-btn"]')
    //     await themeToggleBtn.trigger('click')
    //     const wrapperClasses = wrapper.find('[data-test-id="app"]').classes()
    //     expect(wrapperClasses).toContain('v-theme--anasaeLight')
    //     })
        
    // })
  
})