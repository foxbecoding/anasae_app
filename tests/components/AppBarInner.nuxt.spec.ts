import { mountSuspended } from 'nuxt-vitest/utils'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import AppBarInner from '@/components/AppBarInner/index.vue'
import AppBarInnerStart from '@/components/AppBarInner/Start.vue'
import AppBarInnerCenter from '@/components/AppBarInner/Center.vue'
import AppBarInnerEnd from '@/components/AppBarInner/End.vue'
import layout from '@/layouts/default.vue'
import { useAuthStore } from '@/store'

describe('AppBarInner Component', () => {

  describe('Test AppBarInner Component', () => {
    it('renders component instance', async () => { 
      const wrapper = await mountSuspended(AppBarInner)
      expect(wrapper.vm).toBeTruthy() 
    })
  })

  describe('Test AppBarInnerStart Component', () => {
    it('renders component instance', async () => { 
      const wrapper = await mountSuspended(AppBarInnerStart)
      expect(wrapper.vm).toBeTruthy()  
    })
  })

  describe('Test AppBarInnerCenter Component', () => {
    it('renders component instance', async () => { 
      const wrapper = await mountSuspended(AppBarInnerCenter)
      expect(wrapper.vm).toBeTruthy() 
    })
  })

  describe('Test AppBarInnerEnd Component', () => {
    it('renders component instance and buttons', async () => { 
      const toggleTheme = vi.fn()
      const wrapper = await mountSuspended(AppBarInnerEnd, {
        data() {
          return {
            bar: 'my-override'
          }
        }
      })
      
      const signInBtn = wrapper.find('[data-test-id="app-bar-inner-end-sign-btn"]')
      const themeToggleBtn = wrapper.find('[data-test-id="app-bar-inner-end-theme-toggle-btn"]')
      const cartBtn = wrapper.find('[data-test-id="app-bar-inner-end-cart-btn"]')
      const profileBtn = wrapper.find('[data-test-id="app-bar-inner-end-profile-btn"]')
      const mobileProfileBtn = wrapper.find('[data-test-id="app-bar-inner-end-mobile-profile-btn"]')
      
      await signInBtn.trigger('click')
      // await profileBtn.trigger('click')
      expect(wrapper.vm).toBeTruthy() 
      expect(signInBtn).toBeTruthy()
      expect(themeToggleBtn).toBeTruthy()
      expect(cartBtn).toBeTruthy()
      // expect(profileBtn).toBeTruthy()
      // expect(mobileProfileBtn).toBeTruthy()
    })

    it('it test profile-btn', async () => {

    })

    it('test themeToggle()', async () => {
      const wrapper = await mountSuspended(layout)
      const themeToggleBtn = wrapper.find('[data-test-id="app-bar-inner-end-theme-toggle-btn"]')
      await themeToggleBtn.trigger('click')
      const wrapperClasses = wrapper.find('[data-test-id="app"]').classes()
      expect(wrapperClasses).toContain('v-theme--anasaeLight')
    })
    
  })
  
})