import { useTheme } from 'vuetify'

export const useThemeAssets = () => {
    const config = useRuntimeConfig()    
    const theme = useTheme()
    const LOGO = computed<string>((): string => {
        const theme_color = theme.global.current.value.dark ? 'logo-dark-v1' : 'logo-light-v1'
        return `${config.public.CDN_MEDIA_URL}/assets/${theme_color}.png`    
    })
    return { }
}