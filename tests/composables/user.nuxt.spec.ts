import  { useUserMenu } from '@/composables/user'
import { UserMenuHome, UserMenuTheme } from '@/components/User/Menu/components'
import { mockComponent, mountSuspended } from 'nuxt-vitest/utils'

  
describe('useUserMenu composable', async () => {
    it('test composable functions', async () => {
        onMounted(() => {
            const { goBack, updateMenu, selectedView } = useUserMenu()
            console.log('FOXXXXXXXXXXXX')
        })
    })
})