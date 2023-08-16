import { useDisplay } from 'vuetify'

export const useLayout = () => {
    const { xs } = useDisplay()
    const Layout_PX = computed<string>((): string => xs.value ? 'px-4' : 'px-8')

    return { Layout_PX } 
}