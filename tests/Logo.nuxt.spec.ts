import { describe, it, expect, test } from 'vitest'
import { mountSuspended, mockComponent } from 'nuxt-vitest/utils'

import Logo from '..//components/Logo.vue'

describe('Logo', () => {
  it('is a Vue instance', async () => {
    const wrapper = await mountSuspended(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})