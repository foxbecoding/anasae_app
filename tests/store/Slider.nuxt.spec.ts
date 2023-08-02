import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useSliderStore } from '@/store/Slider'


describe('Slider store', async () => {
    beforeEach(() => {
        setActivePinia(createTestingPinia())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('test Slider store', async () => {
        const sliderStore = useSliderStore()
        const spy = vi.spyOn(sliderStore, 'init').mockImplementation(async (): Promise<void> => {})
        await sliderStore.init()
        expect(sliderStore).toBeTruthy()
        expect(spy).toHaveBeenCalledOnce()
    })
})