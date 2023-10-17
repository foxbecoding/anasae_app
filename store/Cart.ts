export const useCartStore = defineStore("cart-store", () => {
    const cart = ref<{pk: string|number, qty: number}[]>([])

    return {
        cart
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}