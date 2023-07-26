import { Slider, Slide } from 'utils/types'

export const useSliderStore = defineStore("slider-store", () => {
    const currentSlide = ref<Slide>({} as Slide)
    const slides = ref<Slide[]>([])
    
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_SLIDER}1/`)
        const data = await res.json() as Slider
        slides.value = data.images
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