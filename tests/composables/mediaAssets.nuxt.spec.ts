import { mockComponent, mountSuspended, mockNuxtImport } from 'nuxt-vitest/utils'
import  { useMediaAssets } from '@/composables/mediaAssets'

describe('useMediaAssets composable', async () => {
    test('composable', async () => {
        const cdnPath = 'http://cdn.anasae.local'
        const assetPath = '/media/slider/slide-TBbkyQm0I-1690339280.png'
        const res = await useMediaAssets(assetPath)
        const asset = res.Asset.value
        expect(asset).toBe(cdnPath+assetPath)
        expect(useMediaAssets).toBeTruthy()
    })
})