export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig()
    const { data: brand, refresh, pending, error, status } = await useApi({
        path: `${config.public.API_BRAND_PAGE}${to.params.uid}/`,
        method: 'GET',
        key: `${to.params.uid}`
    })
    if(status.value == 'error') navigateTo('/') 
    if(!brand.value.isOwner) navigateTo('/')
    return 
});
  