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
        const asset_path = '/media/slider/slide-TBbkyQm0I-1690339280.png'
        const res = await useMediaAssets(asset_path)
        console.log(res.Asset.value)
        expect(useMediaAssets).toBeTruthy()
    })
})