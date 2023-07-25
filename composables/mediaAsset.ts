import { useTheme } from 'vuetify'

export const useMediaAsset = (asset_path: string = '') => {
    const config = useRuntimeConfig()
    const theme = useTheme()
    const media_asset_path = ref<string>(asset_path)
    const Asset = computed<string>((): string => `${config.public.CDN_MEDIA_URL}${media_asset_path.value}`)
    const Logo = computed<string>((): string => {
        const theme_color = theme.global.current.value.dark ? 'logo-dark-v1.png' : 'logo-light-v1.png'
        media_asset_path.value = `/assets/${theme_color}`
        return Asset.value 
    })
    return { Logo, Asset }
}