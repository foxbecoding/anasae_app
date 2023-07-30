import { useTheme } from 'vuetify'

export const useMediaAssets = (asset_path: string = '') => {
    const config = useRuntimeConfig()
    const media_asset_path = ref<string>(asset_path)
    const Asset = computed<string>((): string => `${config.public.CDN_MEDIA_URL}${media_asset_path.value}`)
    return { Asset }
}

export const useLogo = () => {
    const dir_path = ref<string>('/assets/')
    const theme = useTheme()
    const config = useRuntimeConfig()
    const Logo = computed<string>((): string => {
        const theme_color = theme.global.current.value.dark ? `${dir_path.value}logo-dark-v1.png` : `${dir_path.value}logo-light-v1.png`
        return `${config.public.CDN_MEDIA_URL}${theme_color}`
    })

    return { Logo }
}