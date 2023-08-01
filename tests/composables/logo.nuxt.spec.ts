import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import  { useLogo } from '@/composables/logo'

/** TODO - figure out how to test useLogo() value **/

describe('useLogo composable', async () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })
    test('composable', async () => {
        // const cdnPath = 'http://192.168.1.235:3058'
        // const assetPath = '/media/slider/slide-TBbkyQm0I-1690339280.png'
        // const res = await useMediaAssets(assetPath)
        // const asset = res.Asset.value
        // expect(asset).toBe(cdnPath+assetPath)
        expect(useLogo).toBeTruthy()
    })
})