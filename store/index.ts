import { useSliderStore } from "./Slider"

export const useRootStore = defineStore("root", () => {
    const sliderStore = useSliderStore()
   
    //methods
    const initServer = async (): Promise<void> => {
        nextTick(async () => {
            await fetch(`${process.env.API_BASE_URL}${process.env.API_X_FCT}`)
        })
        await sliderStore.init()
    }
    
    return { 
        initServer
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRootStore, import.meta.hot));
}