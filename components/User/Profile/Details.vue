<script setup lang="ts">
import { User } from '@/utils/types'
import { useUserStore } from '@/store'

const config = useRuntimeConfig()
const route = useRoute()
const { DefaultProfileImg } = useDefaultProfileImg()
const profile = ref<User>()
const profileImgFile = ref()
const profileImgFileRef = ref()
const isOwner = ref<boolean>()
const showAddImgBtn = ref<boolean>(false)
const isEditDialogOpen = ref<boolean>(false)

const ProfileImage = computed(() => {
    if (profile.value?.image) {
        const { Asset } = useMediaAssets(profile.value.image.image)  
        return Asset.value
    }
    return DefaultProfileImg.value 
})

const loadEmmiter = (): void => { showAddImgBtn.value = true }

const getProfile = async (): Promise<void> => {
    // const { data: cacheData } = useNuxtData(`${route.params.uid}`)
    // profile.value = cacheData?.value?.user
    // isOwner.value = cacheData?.value?.owner
    
    const { data, pending, error, refresh } = await useApi({
        path: `${config.public.API_USER_PROFILE}${route.params.uid}/`,
        method: 'GET',
        key: `${route.params.uid}`
    })

    // console.log(cacheData?.value)
    console.log(data.value)
    // console.log('store: '+useUserStore().user.username)
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
    useUserStore().user = data.value
}

watch(profileImgFile, (newFile) => { uploadImage(newFile[0]) })
</script>

<template>
    <div class="d-flex justify-space-between content-wrapper">
        <v-file-input
            v-model="profileImgFile" 
            class="d-none" 
            ref="profileImgFileRef" 
            accept="image/png, image/jpeg, image/bmp"
        />
        <div class="profile-image-size" style="position: relative">
            <v-img 
                class="rounded-circle profile-image-size border" 
                :src="ProfileImage" 
                :alt="`${profile?.username} profile image`"
                @load="loadEmmiter"
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
        
        <div class="d-block align-center">
            <div class="d-flex align-center">
                <h2 class="px-4 text-h5 text-sm-h4">
                    {{ profile?.username }}
                </h2>
                <v-btn 
                    :to="{path: `/profile/edit/${profile?.uid}`}"
                    :color="!isOwner ? 'primary-alt' : 'surface'" 
                    class="ma-4 d-none d-sm-flex" 
                    rounded="pill"
                    flat
                >
                    <v-icon v-if="!isOwner">mdi-plus</v-icon>
                    <v-icon v-else>mdi-pencil</v-icon>
                    {{ !isOwner ? 'Follow' : 'Edit Profile'  }}
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
                @click="isEditDialogOpen = true"
                :color="!isOwner ? 'primary-alt' : 'surface'" 
                class="ma-4 d-sm-none" 
                rounded="pill"
                size="small"
                flat
            >
                <v-icon v-if="!isOwner">mdi-plus</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
                {{ !isOwner ? 'Follow' : 'Edit Profile'  }}
            </v-btn>
        </div>
    </div>
    <!-- <UserProfileEditDetails v-model="isEditDialogOpen" /> -->
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
    height: 126px;
}

@media screen and (max-width: 1279px) {
    .content-wrapper {
        max-width: 550px
    }
}

@media screen and (max-width: 959px) {
    .profile-image-size {
        width: 108px;
        height: 108px;
    }
    .content-wrapper {
        max-width: 450px
    }
}

@media screen and (max-width: 599px) {
    .profile-image-size {
        width: 60px;
        height: 60px;
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