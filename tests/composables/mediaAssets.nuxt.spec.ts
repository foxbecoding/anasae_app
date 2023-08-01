import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import  { useMediaAssets } from '@/composables/mediaAssets'

describe('useLogo composable', async () => {
    // beforeEach(() => {
    //     app = createApp({})
    //   })
    afterEach(() => {
        vi.unstubAllGlobals()
    })
    test('composable', async () => {
        const 
        const assetPath = '/media/slider/slide-TBbkyQm0I-1690339280.png'
        const res = await useMediaAssets(assetPath)
        console.log(res.Asset.value)
        expect(useMediaAssets).toBeTruthy()
    })
})