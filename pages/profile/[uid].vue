<script setup lang="ts">
import { User } from '@/utils/types'
import { useAuthStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const profile = ref<User>({} as User)
const isOwner = ref<boolean>()

const getProfile = async (): Promise<void> => {
    const { data: cacheData } = useNuxtData(`${route.params.uid}`)
    profile.value = cacheData?.value?.user
    isOwner.value = cacheData?.value?.owner
    
    const { data, pending, error, refresh } = await useApi({
        path: `${config.public.API_USER_PROFILE}${route.params.uid}/`,
        method: 'GET',
        key: `${route.params.uid}`
    })

    profile.value = data.value.user
    isOwner.value = data.value.owner
}

getProfile()

</script>

<template>
    <v-container class="layout-px" fluid>
        <v-img v-if="profile.image" :src="profile.image" />
        <v-icon v-else size="150" class="mask mask-squircle">mdi-account-circle</v-icon>
    </v-container>
</template>