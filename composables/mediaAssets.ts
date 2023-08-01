export const useMediaAssets = (assetPath: string = '') => {
    const config = useRuntimeConfig()
    const mediaAssetPath = ref<string>(assetPath)
    const Asset = computed<string>((): string => `${config.public.CDN_URL}${mediaAssetPath.value}`)
    return { Asset }
}