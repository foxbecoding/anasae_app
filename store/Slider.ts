import { Slider, Slide, ApiData } from 'utils/types'

export const useSliderStore = defineStore("slider-store", () => {
    const currentSlide = ref<Slide>({} as Slide)
    const slides = ref<Slide[]>([])
    
    const init = async (): Promise<void>  => {
        const config = useRuntimeConfig()
        let apiData: ApiData = {
            path: `${config.public.API_SLIDER}1/`,
            method: 'GET',
        }
        const { data, error, status, refresh, pending } = await useApi(apiData)
        slides.value = data.value.images
    }

    return { 
        currentSlide,
        slides,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSliderStore, import.meta.hot))
}