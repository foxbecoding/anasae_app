import { mountSuspended } from 'nuxt-vitest/utils'

import AppBarInner from '@/components/AppBarInner/index.vue'
import AppBarInnerStart from '@/components/AppBarInner/Start.vue'
import AppBarInnerCenter from '@/components/AppBarInner/Center.vue'
import AppBarInnerEnd from '@/components/AppBarInner/End.vue'
import layout from '@/layouts/default.vue'

describe('AppBarInner Component', () => {
  beforeEach( async () => {})

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
      const wrapper = await mountSuspended(AppBarInnerEnd)
      
      const signInBtn = wrapper.find('[data-test-id="app-bar-inner-end-sign-btn"]')
      const themeToggleBtn = wrapper.find('[data-test-id="app-bar-inner-end-theme-toggle-btn"]')
      const cartBtn = wrapper.find('[data-test-id="app-bar-inner-end-cart-btn"]')
      
      expect(wrapper.vm).toBeTruthy() 
      expect(signInBtn).toBeTruthy()
      expect(themeToggleBtn).toBeTruthy()
      expect(cartBtn).toBeTruthy()
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