<script setup lang="ts">
import { User } from '@/utils/types'
import { useAuthStore } from '@/store'
import { useDisplay, useTheme } from 'vuetify'

const config = useRuntimeConfig()
const route = useRoute()
const vTheme = useTheme()
const profile = ref<User>( )
const isOwner = ref<boolean>()
const { xs, sm } = useDisplay()

const DefaultProfileImg = computed<string>((): string => {
    const lightImg = '/assets/default-profile-image-light.png'
    const darkImg = '/assets/default-profile-image-dark.png'
    const theme_color = vTheme.global.current.value.dark ? darkImg : lightImg
    return `${config.public.CDN_MEDIA_URL}${theme_color}`
})

const ProfileImageSize = computed(() => {
    if(xs.value) return 60;
    else if(sm.value) return 108;
    else return 126;
})

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
    <div class="d-flex justify-space-between align-center" :style="{maxWidth: `550px`}">
        <div :style="{width: `${ProfileImageSize}px`}">
            <div style="position: relative">
                <v-img 
                    :width="ProfileImageSize" 
                    class="rounded-circle" 
                    :src="profile?.image ? profile.image : DefaultProfileImg" 
                />
                <v-btn 
                    v-if="isOwner"
                    class="add-profile-image-btn"
                    color="primary-alt" 
                    size="18" 
                    flat 
                    icon
                >
                    <v-icon size="16">mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        
        <div class="d-block">
            <h2 class="px-4 text-h4">{{ profile.username }}</h2>
            <div class="d-flex">
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">369</span>
                    <span class="text-body-1">post</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">11.1k</span>
                    <span class="text-body-1">followers</span>
                </div>
            </div>
            <v-btn>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.add-profile-image-btn {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

@media screen and (max-width: 599px) {
  .add-profile-image-btn {
    bottom: 0;
    right: 0;
  }
}
</style>