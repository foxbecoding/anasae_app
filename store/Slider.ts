import { Slide } from 'utils/types'

export const useSliderStore = defineStore("slider-store", () => {
    const currentSlide = ref<Slide>()
    const slides = ref<Slide[]>([
        {
            pk: 1,
            src: 'http://192.168.1.235:3058/media/assets/slide1.png'
        },
        {
            pk: 2,
            src: 'http://192.168.1.235:3058/media/assets/slide5.png'
        },
        {
            pk: 3,
            src: 'http://192.168.1.235:3058/media/assets/slide3.png'
        },
        {
            pk: 4,
            src: 'http://192.168.1.235:3058/media/assets/slide4.png'
        }
    ])
    
    // const initExploreBeats = async (): Promise<void>  => {
    //     const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_EXPLORE_BEATS}`)
    //     const data = await res.json() as Beat[]
    //     explore_beats.value = data
    // }

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
        slides
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSliderStore, import.meta.hot))
}