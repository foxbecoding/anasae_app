import  { useLogo } from '@/composables/mediaAssets'

describe('useLogo composable', () => {
    test('composable', async () => {
        const { Logo } = await useLogo()
        console.log(Logo)
        expect(useLogo).toBeTruthy()
    })
})