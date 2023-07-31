import  { useLogo } from '@/composables/mediaAssets'

describe('useLogo composable', () => {
    test('composable', async () => {
        // await useLogo()
        // console.log(Logo)
        expect(useLogo).toBeTruthy()
    })
})