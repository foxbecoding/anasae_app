<script setup lang="ts">
import { User } from '@/utils/types'
import { useUserStore, useAuthStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
const { DefaultProfileImg } = useDefaultProfileImg()
const profile = ref<User>()
const profileImgFile = ref()
const profileImgFileRef = ref()
const isOwner = ref<boolean>()
const showAddImgBtn = ref<boolean>(false)

const ProfileImage = computed(() => {
    if (profile.value?.image) {
        const { Asset } = useMediaAssets(profile.value.image.image)  
        return Asset.value
    }
    return DefaultProfileImg.value 
})


const UID = computed(() => {
    if (route.fullPath.includes('auth')){
        return authStore.prevRoute.split('/').slice(-1)[0]   
    }
    return route.params.uid
})


const loadEmmiter = (): void => { showAddImgBtn.value = true }

const getProfile = async (): Promise<void> => {
    const { data: cacheData } = useNuxtData(`${UID.value}`)
    profile.value = cacheData?.value?.user
    isOwner.value = cacheData?.value?.owner

    const { data, pending, error, refresh } = await useApi({
        path: `${config.public.API_USER_PROFILE}${UID.value}/`,
        method: 'GET',
        key: `${UID.value}`
    })

    isOwner.value = data.value.owner
    profile.value = data.value.user
}

getProfile()

const uploadImage = async (file: File): Promise<void> => {
    let formData = new FormData();
    formData.append("image", file);
    const { data, pending, error, refresh } = await useApi({
        path: `${config.public.API_USER_IMAGE}`,
        method: 'POST',
        data: formData,
        isMultiPart: true 
    })
    profile.value = data.value
    userStore.user = data.value
}

watch(profileImgFile, (newFile) => { uploadImage(newFile[0]) })
</script>

<template>
    <div class="d-sm-flex justify-space-between content-wrapper text-center text-sm-left">
        <v-file-input
            v-model="profileImgFile" 
            class="d-none" 
            ref="profileImgFileRef" 
            accept="image/png, image/jpeg, image/bmp"
        />
        <div class="profile-image-size mx-auto mx-sm-0" style="position: relative">
            <v-img 
                class="rounded-circle profile-image-size border" 
                :src="ProfileImage" 
                :alt="`${profile?.username} profile image`"
                @load="loadEmmiter"
                cover
            />
            <v-btn 
                v-if="isOwner && showAddImgBtn"
                @click="profileImgFileRef.click()"
                class="add-profile-image-btn"
                color="primary-alt" 
                size="18" 
                flat 
                icon
            >
                <v-icon size="16">mdi-plus</v-icon>
            </v-btn>
        </div>
        <h2 class="text-h6 text-sm-h5 d-sm-none">
            @{{ profile?.username }}
        </h2>
        <div class="d-block text-center">
            <h2 class="d-none text-left pl-4 d-sm-block text-sm-h5">
                @{{ profile?.username }}
            </h2>
            <div class="d-flex justify-center">
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">369</span>
                    <span class="text-body-1">post</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">11.1k</span>
                    <span class="text-body-1">followers</span>
                </div>
            </div>
            
        </div>
        <v-btn 
            :to="{path: `/profile/edit/${profile?.uid}`}"
            color="primary" 
            class="d-none d-sm-flex" 
            rounded="pill"
            flat
            :text="!isOwner ? 'Follow' : 'Edit Profile'"
        />
    </div>
    <v-btn 
        :to="{path: `/profile/edit/${profile?.uid}`}"
        color="primary" 
        class="d-sm-none mt-4" 
        rounded="pill"
        block
        flat
        :text="!isOwner ? 'Follow' : 'Edit Profile'"
    />
    
</template>

<style scoped>
.content-wrapper {
    max-width: 100%
}

.add-profile-image-btn {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

.profile-image-size {
    width: 126px;
    height: 126px;
}


@media screen and (max-width: 959px) {
    .profile-image-size {
        width: 108px;
        height: 108px;
    }
}

@media screen and (max-width: 599px) {
    .profile-image-size {
        width: 60px;
        height: 60px;
    }
    
    .add-profile-image-btn {
        bottom: 0;
        right: 0;
    }
}
</style>