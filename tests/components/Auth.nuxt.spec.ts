import { mountSuspended } from 'nuxt-vitest/utils'
import { VueWrapper } from '@vue/test-utils'
import { RouteLocationRaw, NavigationFailure, RouteRecordName } from 'vue-router';
import Auth from '@/components/Auth/index.vue'
import AuthLoginForm from '@/components/Auth/LoginForm.vue'
import AuthSignUpForm from '@/components/Auth/SignUpForm/index.vue'
import {
    AuthSignUpFormStepOne, 
    AuthSignUpFormStepTwo, 
    AuthSignUpFormStepThree, 
    AuthSignUpFormStepStepFour
} from '@/components/Auth/SignUpForm/components'
import { useAuthStore } from '@/store'

describe('Auth components', () => {

    describe('Auth component', () => {
        it('render Auth Dialog', async () => {
            const wrapper =  await mountSuspended(Auth)
            expect(wrapper.vm).toBeTruthy()
        })
    })

    describe('AuthLoginForm component', () => {
        it('test AuthLoginForm content', async () => {
            const wrapper = await mountSuspended(AuthLoginForm)
            const title = wrapper.find('[data-test-id="AuthLoginForm--title"]')
            const formFields = wrapper.find('[data-test-id="AuthLoginForm--fields"]')
            const switchField = wrapper.find('[data-test-id="AuthLoginForm--switch"]')
            const pText = wrapper.find('[data-test-id="AuthLoginForm--have-an-account"]')
            const link = wrapper.find('[data-test-id="AuthLoginForm--have-an-account-link"]')
            
            expect(wrapper.vm).toBeTruthy()
            expect(title).toBeTruthy()
            expect(title.text()).toBe('Login')
            expect(formFields).toBeTruthy()
            expect(switchField).toBeTruthy()
            expect(pText).toBeTruthy()
            expect(link).toBeTruthy()
        })

        it('test AuthLoginForm switch update', async () => {
            useAuthStore().loginForm.isUsername = true
            const wrapper = await mountSuspended(AuthLoginForm)
            const elements = wrapper.findAll('[class="v-label v-field-label"]')
            const elUsername = elements.find(x => x.text() == 'Username')
            expect(elUsername?.text()).toBe('Username')
        })
    }),

    describe('AuthSignUpForm component', () => {
        it('render AuthSignUpForm ', async () => {
            const wrapper =  await mountSuspended(AuthSignUpForm)
            expect(wrapper.vm).toBeTruthy()
        })
    })
})