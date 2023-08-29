export const useSnackbarStore = defineStore("snackbar-store", () => {
    const show = ref<boolean>(false)
    const text = ref<string>('')
    const imgSrc = ref<string>('')
    
    const setSnackbar = (
        data_text: string, 
        data_show: boolean, 
        data_img_src: string = ''
    ): void => {
        text.value = data_text
        show.value = data_show
        imgSrc.value = data_img_src
    }

    return { 
        imgSrc,
        show,
        text,
        setSnackbar
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot));
}