import { ApiData } from '@/utils/types'

export const useApi = async (apiData: ApiData): Promise<any> => {
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

    const { data, pending, error, refresh, status } = await useFetch(apiData.path, {
        baseURL: config.public.API_BASE_URL,
        body: apiData.data,
        credentials: 'include',
        headers: requestHeaders,
        method: apiData.method,
        key: apiData.key
    })

    // if(status.value == 'error'){
    //     console.log(error.value)
    //     return 
    // }
    
    return { data, pending, error, refresh, status }
}