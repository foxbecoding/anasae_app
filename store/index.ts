import { useSliderStore } from "./Slider"

export const useRootStore = defineStore("root", () => {
    const sliderStore = useSliderStore()
   
    //methods
    const initServer = async (): Promise<void> => {
        await sliderStore.init()
    }
    
    return { 
        initServer
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRootStore, import.meta.hot));
}