import { describe, it, expect, beforeEach, vi } from 'vitest'
import useRouterMock from './mocks/useRouterMock'
// import useRouterMock from './mocks/useRouterMock'
import { mockComponent, mountSuspended, mockNuxtImport} from 'nuxt-vitest/utils'
// import { useRouter } from 'nuxt'
// import { useRouter } from 'vue-router'
import { setup } from '@nuxt/test-utils'
import Logo from '@/components/Logo.vue'

// vi.mock('nuxt')
mockNuxtImport('useRouter', () => {
  return () => useRouterMock()
})

describe('Logo Component', () => {
  let VImg, wrapper;
  // useRouter.mockReturnValue({
  //   push: vi.fn(),
  // })
  

  
  beforeEach( async () => {
    wrapper = await mountSuspended(Logo, { route: '/' })
    VImg = wrapper.find('v-img')
    // useRouter().push({name: 'index'})
    // useRouter().push.mockReset()
  })

  // it('renders component instance', async () => { expect(wrapper.vm).toBeTruthy() })
  // it('renders v-img component', async () => { expect(VImg).toBeTruthy() })
  // it('checks if composable sets src attr', async () => { expect(VImg.attributes().src).not.toBe('') })
  it('checks test', async () => { 
    useRouter().push({name: 'profile'})
    // await VImg.trigger('click')
    // useRouter().push({name: 'index'})
    // useRouterMock().mockImplementation(() => {
    //   return useRouter().push({name: 'index'})
    // })
    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'index'
    })
  })
})