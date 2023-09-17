export const useBrandCenterProductStore = defineStore("brand-center-product-store", () => {
    const currentStep = ref<number>(1)
    const steps = ref<{id: number, title: string}[]>([
        {id: 1, title: 'Product details'},
        {id: 2, title: 'Confirm product(s)'}
    ])
    
    const formData = reactive({
        title: '',
        description: '',
        category: null,
        quantity: 0,
        sku: '',
        isbn: ''
    })

    return {
        currentStep,
        formData,
        steps
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBrandCenterProductStore, import.meta.hot));
}