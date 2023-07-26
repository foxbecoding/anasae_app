import { Slider, Slide } from 'utils/types'

export const useSliderStore = defineStore("slider-store", () => {
    const currentSlide = ref<Slide>({} as Slide)
    const slides = ref<Slide[]>([])
    
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_SLIDER}1/`)
        const data = await res.json() as Slider
        slides.value = data.images
    }

    // const getExploreBeats = async (): Promise<void> => {
    //     const config = useRuntimeConfig()
    //     const {data, error} = await useApi(config.public.API_EXPLORE_BEATS)
    //     if(error.value){
    //         console.log(error.value)
    //         return
    //     } 
    //     explore_beats.value = data.value as Beat[]
    // }

    // const EXPLORE_BEATS = computed(
    //     () => explore_beats.value
    // )

    return { 
        currentSlide,
        slides,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSliderStore, import.meta.hot))
}