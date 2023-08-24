import { Brand, BrandOwner } from '@/utils/types'

export const useGetOwnerBrands = async (pks: string[] | number[]) => {
    const config = useRuntimeConfig()
    
    const {data: ownedBrands} = await useApi({
        path: `${config.public.API_BRAND_OWNER}${pks.toString()}/`,
        method: 'GET'
    })
    
    if (ownedBrands.length === 0) return []
    let brandPks = ownedBrands.value.map((x: BrandOwner) => x.brand)
    
    const {data: brands} = await useApi({
        path: `${config.public.API_BRAND}${brandPks.toString()}/`,
        method: 'GET',
        key: `${config.public.API_BRAND}${brandPks.toString()}/`
    })
    return brands as Brand[]
}