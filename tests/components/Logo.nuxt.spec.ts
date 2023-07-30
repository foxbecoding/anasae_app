import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'
import nopComponent from '/nop-component.vue'

vi.mock('vue-router')

describe('Logo Component', async () => {
  let VImg: any, wrapper: any;
 
  useRouter.mockReturnValue({
    push: vi.fn()
  })

  beforeEach( async () => {
    wrapper =  await mountSuspended(Logo)
    
    // useRouter().push({name: 'clipz'})
    VImg = wrapper.find('[data-test-id="logo"]')
    // useRouter().push({name: 'index'})
    // useRouter().push.mockRe
  })

  it('renders component instance', async () => { 
    // expect(wrapper.vm).toBeTruthy() 
    // expect(VImg).toBeTruthy()
    // expect(VImg.attributes().src).not.toBe('')
    // useRouter().push({name: 'clipz'})
    await VImg.trigger('click')
    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'clipz'
    })
  })

})