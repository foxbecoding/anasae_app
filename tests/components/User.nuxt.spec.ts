import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import { UserMenuHome, UserMenuTheme } from '@/components/User/Menu/components'
import { useUserMenuStore, useAuthStore } from '@/store'

describe('UserMenu Components', async () => {

  it('renders UserMenuHome component instance', async () => { 
    useAuthStore().isAuth = true
    useUserMenuStore().selectedView = UserMenuHome
    // const wrapper =  await mountSuspended(UserMenuHome)
    // const profileItem = wrapper.find('[data-test-id="user-menu-home-account-item0"]')
    // expect(wrapper.vm).toBeTruthy() 
    // console.log(profileItem.html())
    // expect(VImg).toBeTruthy()
    // expect(VImg.attributes().src).not.toBe('')
  })
  
})