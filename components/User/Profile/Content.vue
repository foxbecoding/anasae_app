<script setup lang="ts">
import { useUserStore, useAuthStore, useSnackbarStore } from '@/store'
import { User } from '@/utils/types'

const config = useRuntimeConfig()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore()
const { DefaultProfileImg } = useDefaultProfileImg()
const profileImgFile = ref()
const profileImgFileRef = ref()
const showAddImgBtn = ref<boolean>(false)
const isProfileExist = ref<boolean>(true)

const loadEmmiter = (): void => { showAddImgBtn.value = true }

const UID = computed(() => {
    if (route.fullPath.includes('auth')){
        return authStore.prevRoute.split('/').slice(-1)[0]   
    }
    return route.params.uid
})

const { data: profile, status, refresh } = await useApi({
    path: `${config.public.API_USER_PROFILE}${UID.value}/`,
    method: 'GET',
    key: `${UID.value}`
})

if(status.value == 'error'){
    isProfileExist.value = false
    let userData: User = {
        pk: 0,
        username: 'Profile does not exist',
        first_name: '',
        last_name: '',
        uid: '',
        owned_brands: [],
        image: {pk: 0, image: ''},
        display_name: ''

    }
    profile.value = userData
}

const ProfileHandlerLabel = computed((): string => {
    if(profile.value.isOwner) return 'Edit'
    else if(profile.value?.isFollowing) return 'Unfollow'
    return 'Follow'
})

const ProfileImage = computed(() => {
    if (profile.value?.image) {
        const { Asset } = useMediaAssets(profile.value.image.image)  
        return Asset.value
    }
    return DefaultProfileImg.value 
})

const uploadImage = async (file: File): Promise<void> => {
    let formData = new FormData();
    formData.append("image", file);
    const { data } = await useApi({
        path: `${config.public.API_USER_IMAGE}`,
        method: 'POST',
        data: formData,
        isMultiPart: true 
    })
    data.value['isOwner'] = true
    profile.value = data.value
    userStore.user = data.value
    snackbarStore.setSnackbar('Image uploaded', true)
}

const ProfileHandler = async (): Promise<void> => {
    if(!authStore.isAuth) { 
        await authStore.setPrevRouteData(route.fullPath, route.name)
        navigateTo('/auth/login'); return; 
    }
    if(profile.value.isOwner){ navigateTo(`/profile/edit/${profile.value.uid}`); return; }
    else if(profile.value?.isFollowing) {
        await useApi({
            path: `${config.public.API_USER_FOLLOWERS}/${userStore.user.pk}`,
            method: 'DELETE'
        })
        snackbarStore.setSnackbar(`Unfollowed ${profile.value.username}`, true, ProfileImage.value)
        refresh()
        return 
    }
    await useApi({
        path: `${config.public.API_USER_FOLLOWERS}`,
        method: 'POST',
        data: {user: profile.value.pk}
    })
    snackbarStore.setSnackbar(`Now following ${profile.value.username}`, true, ProfileImage.value)
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
                v-if="profile.isOwner && showAddImgBtn"
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
        <v-card 
            class="d-sm-none"
            max-width="500" 
            color="background"
            :title="isProfileExist ? `@${ profile?.username }` : `${ profile?.username }`"
            :subtitle="`${profile.display_name}`"
        />
        <div v-if="isProfileExist" class="d-block text-center">
            <div class="d-flex justify-center">
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">369</span>
                    <span class="text-body-1">post</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">{{ profile.followers }}</span>
                    <span class="text-body-1">followers</span>
                </div>
                <div v-if="profile.isOwner" class="px-4 d-flex flex-column">
                    <span class="text-body-1">{{ profile.followed_users }}</span>
                    <span class="text-body-1">following</span>
                </div>
            </div>
        </div>
        <v-btn 
            v-if="isProfileExist"
            @click="ProfileHandler"
            color="primary" 
            class="d-none d-sm-flex" 
            rounded="pill"
            flat
            :text="ProfileHandlerLabel"
        />
    </div>
    <v-card 
        class="d-none d-sm-block"
        max-width="500" 
        color="background"
        :title="isProfileExist ? `@${ profile?.username }` : `${ profile?.username }`"
        :subtitle="`${profile.display_name}`"
    />
    <v-btn
        v-if="isProfileExist" 
        @click="ProfileHandler"
        color="primary" 
        class="d-sm-none mt-4" 
        rounded="pill"
        block
        flat
        :text="ProfileHandlerLabel"
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