import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockComponent, mountSuspended, mockNuxtImport,} from 'nuxt-vitest/utils'
// import { setup, $fetch } from '@nuxt/test-utils'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'

vi.mock('vue-router')

describe('Logo Component', async () => {
  let VImg, wrapper;
  useRouter.mockReturnValue({
    push: vi.fn(),
  })

  // const _useRouter = vi.fn()
  
  beforeEach( async () => {
    wrapper = await mountSuspended(Logo)
    VImg = wrapper.find('[data-test-id="logo"]')
    // useRouter().push({name: 'index'})
    // useRouter().push.mockRe
  })

  it('renders component instance', async () => { 
    // expect(wrapper.vm).toBeTruthy() 
    // expect(VImg).toBeTruthy()
    // expect(VImg.attributes().src).not.toBe('')
    await VImg.trigger('click')
    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'clipz'
    })
  })

})