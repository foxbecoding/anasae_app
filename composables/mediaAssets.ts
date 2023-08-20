import { useTheme } from 'vuetify'

export const useMediaAssets = (assetPath: string = '') => {
    const config = useRuntimeConfig()
    const mediaAssetPath = ref<string>(assetPath)
    const Asset = computed<string>((): string => `${config.public.CDN_URL}${assetPath}`)
    return { Asset }
}

export const useDefaultProfileImg = () => {
    const config = useRuntimeConfig()
    const vTheme = useTheme()

    const DefaultProfileImg = computed<string>((): string => {
        const lightImg = '/assets/default-profile-image-light.png'
        const darkImg = '/assets/default-profile-image-dark.png'
        const theme_color = vTheme.global.current.value.dark ? darkImg : lightImg
        return `${config.public.CDN_MEDIA_URL}${theme_color}`
    })

    return { DefaultProfileImg }
}