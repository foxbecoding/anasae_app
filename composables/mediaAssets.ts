export const useMediaAssets = (asset_path: string = '') => {
    const config = useRuntimeConfig()
    const media_asset_path = ref<string>(asset_path)
    const Asset = computed<string>((): string => `${config.public.CDN_URL}${media_asset_path.value}`)
    return { Asset }
}

