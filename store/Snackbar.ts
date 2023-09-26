export const useSnackbarStore = defineStore("snackbar-store", () => {
    const show = ref<boolean>(false)
    const text = ref<string>('')
    const imgSrc = ref<string>('')
    const color = ref<string>()
    
    const setSnackbar = (
        dataText: string, 
        dataShow: boolean, 
        dataImgSrc: string = '',
        dataColor: string = 'surface'
    ): void => {
        text.value = dataText
        show.value = dataShow
        imgSrc.value = dataImgSrc
        color.value = dataColor
        
    }

    return { 
        color,
        imgSrc,
        show,
        text,
        setSnackbar
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot));
}