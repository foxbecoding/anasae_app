import { describe, it, expect, beforeEach } from 'vitest'
import { mockComponent, mountSuspended, } from 'nuxt-vitest/utils'

import Logo from '..//components/Logo.vue'

describe('Logo Component', () => {
  let VImg, vi;
  beforeEach( async () => {
    const wrapper = await mountSuspended(Logo)
    vi = wrapper.vm
    VImg = wrapper.find('v-img')
  })

  it('renders component instance', async () => { expect(vi).toBeTruthy() })
  it('renders v-img component', async () => { expect(VImg).toBeTruthy() })
  it('checks if composable sets src attr', async () => { expect(VImg.attributes().src).not.toBe('') })
})