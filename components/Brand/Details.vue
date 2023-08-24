<script lang="ts" setup>

const config = useRuntimeConfig()
const route = useRoute()

const {data: brand} = await useApi({
    path: `${config.public.API_BRAND_PAGE}${route.params.uid}/`,
    method: 'GET',
    key: `${route.params.uid}`

})

</script>

<template>
    <div>{{ brand }}</div>
</template>