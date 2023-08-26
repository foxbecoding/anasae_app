import { ApiData } from '@/utils/types'
import { UseFetchOptions } from '#app'
import { NitroFetchRequest } from 'nitropack'

export const useApi = async <T>(apiData: ApiData): Promise<any> => {
    const config = useRuntimeConfig()
    const csrftoken: any = useCookie('csrftoken')

    const requestHeaders = ref<HeadersInit>({
        'accept': 'application/json' ,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken.value 
    })
    
    if(apiData.isMultiPart){
        requestHeaders.value = {
            'X-CSRFToken': csrftoken.value
        }
    }

    const options = ref<
    |
        UseFetchOptions<
            T extends void ? unknown : T,
            (res: T extends void ? unknown : T) => T extends void ? unknown : T
        >
    | undefined>({
        baseURL: config.public.API_BASE_URL,
        body: apiData.data,
        credentials: 'include',
        headers: requestHeaders,
        method: apiData.method,
        key: apiData.key
    })

  
    const { data, pending, error, status, refresh, execute } = await useFetch(apiData.path, options.value)
    
    return { data, pending, error, status, refresh, execute }
}