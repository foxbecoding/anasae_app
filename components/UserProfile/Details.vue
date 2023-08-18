<script setup lang="ts">
import { User } from '@/utils/types'
import { useAuthStore } from '@/store'
import { useDisplay, useTheme } from 'vuetify'

const config = useRuntimeConfig()
const route = useRoute()
const vTheme = useTheme()
const profile = ref<User>( )
const isOwner = ref<boolean>()
const showAddImgBtn = ref<boolean>(false)
const { xs, sm, width: vWidth } = useDisplay()

const DefaultProfileImg = computed<string>((): string => {
    const lightImg = '/assets/default-profile-image-light.png'
    const darkImg = '/assets/default-profile-image-dark.png'
    const theme_color = vTheme.global.current.value.dark ? darkImg : lightImg
    return `${config.public.CDN_MEDIA_URL}${theme_color}`
})

const loadEmmiter = (e): void => {
    showAddImgBtn.value = true
}

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
    <div class="d-flex justify-space-between content-wrapper">
        <div class="profile-image-size" style="position: relative">
            <v-img 
                class="rounded-circle profile-image-size" 
                :src="profile?.image ? profile.image : DefaultProfileImg" 
                :alt="`${profile.username} profile image`"
                @load="loadEmmiter"
            />
            <v-btn 
                v-if="isOwner && showAddImgBtn"
                class="add-profile-image-btn"
                color="primary-alt" 
                size="18" 
                flat 
                icon
            >
                <v-icon size="16">mdi-plus</v-icon>
            </v-btn>
        </div>
        
        <div class="d-block align-center">
            <div class="d-flex align-center">
                <h2 class="px-4 text-h5 text-sm-h4">
                    {{ profile.username }}
                </h2>
                <v-btn 
                    color="primary-alt" 
                    class="ma-4 d-none d-sm-block" 
                    rounded="pill"
                >
                    <v-icon>mdi-plus</v-icon>
                    Follow
                </v-btn>
            </div>
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
            <v-btn 
                class="ma-4 d-sm-none" 
                color="primary-alt" 
                rounded="pill"
            >
                <v-icon>mdi-plus</v-icon>
                Follow
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.content-wrapper {
    max-width: 700px
}

.add-profile-image-btn {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

.profile-image-size {
    width: 126px;
}

@media screen and (max-width: 1279px) {
    .content-wrapper {
        max-width: 550px
    }
}

@media screen and (max-width: 959px) {
    .profile-image-size {
        width: 108px;
    }
    .content-wrapper {
        max-width: 450px
    }
}

@media screen and (max-width: 599px) {
    .profile-image-size {
        width: 60px;
    }
    .content-wrapper {
        max-width: 250px
    }
    
    .add-profile-image-btn {
        bottom: 0;
        right: 0;
    }
}
</style>