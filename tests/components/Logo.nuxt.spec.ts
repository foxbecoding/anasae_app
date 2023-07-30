import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import Logo from '@/components/Logo.vue'

describe('Logo Component', async () => {
  let VImg: any, wrapper: any, location: string;

  beforeEach( async () => {
    wrapper =  await mountSuspended(Logo)
    VImg = wrapper.find('[data-test-id="logo"]')
  })

  it('renders component instance', async () => { 
    expect(wrapper.vm).toBeTruthy() 
    expect(VImg).toBeTruthy()
    expect(VImg.attributes().src).not.toBe('')
  })
})

// test code for spying on useRouter
// location = 'clipz'
//     const spy = vi.spyOn(useRouter(), 'push')
//     .mockImplementation(async (to): Promise<void> => {to = {name: location}})