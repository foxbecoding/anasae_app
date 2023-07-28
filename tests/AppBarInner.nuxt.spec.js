import { describe, it, expect, beforeEach } from 'vitest'
import { mockComponent, mountSuspended, } from 'nuxt-vitest/utils'

import AppBarInner from '..//components/AppBarInner'
import AppBarInnerStart from '..//components/AppBarInner/Start.vue'
import AppBarInnerCenter from '..//components/AppBarInner/Center.vue'
import AppBarInnerEnd from '..//components/AppBarInner/End.vue'

describe('AppBarInner Component', () => {
  let viAppBarInner, viAppBarInnerStart, viAppBarInnerCenter, viAppBarInnerEnd;

  beforeEach( async () => {

    const wrapperAppBarInner = await mountSuspended(AppBarInner)
    const wrapperAppBarInnerStart = await mountSuspended(AppBarInnerStart)
    const wrapperAppBarInnerCenter = await mountSuspended(AppBarInnerCenter)
    const wrapperAppBarInnerEnd = await mountSuspended(AppBarInnerEnd)

    viAppBarInner = wrapperAppBarInner.vm
    viAppBarInnerStart = wrapperAppBarInnerStart.vm
    viAppBarInnerCenter = wrapperAppBarInnerCenter.vm
    viAppBarInnerEnd = wrapperAppBarInnerEnd.vm
    
  })

  describe('Test AppBarInner Component', () => {
    it('renders component instance', async () => { expect(viAppBarInner).toBeTruthy() })
  })

  describe('Test AppBarInnerStart Component', () => {
      it('renders component instance', async () => { expect(viAppBarInnerStart).toBeTruthy() })
  })

  describe('Test AppBarInnerCenter Component', () => {
      it('renders component instance', async () => { expect(viAppBarInnerCenter).toBeTruthy() })
  })

  describe('Test AppBarInnerEnd Component', () => {
      it('renders component instance', async () => { expect(viAppBarInnerEnd).toBeTruthy() })
  })
  
})