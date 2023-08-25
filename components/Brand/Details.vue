<script lang="ts" setup>
import { useAuthStore, useUserStore } from '@/store'
import { BrandOwner } from '@/utils/types'

const config = useRuntimeConfig()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
const brandLogoFile = ref()
const brandLogoFileRef = ref()
const showAddImgBtn = ref<boolean>(false)

const loadEmmiter = (): void => { showAddImgBtn.value = true }

const UID = computed(() => {
    if (route.fullPath.includes('auth')){
        return authStore.prevRoute.split('/').slice(-1)[0]   
    }
    return route.params.uid
})

const { data: brand, refresh } = await useApi({
    path: `${config.public.API_BRAND_PAGE}${UID.value}/`,
    method: 'GET',
    key: `${UID.value}`
})

const IsOwner = computed(() => brand.value.owners.find((x: BrandOwner) => x.user == userStore.user.pk) ? true : false)

const BrandLogo = computed(() => useGetBrandLogo(brand.value.logo.image) )

const uploadImage = async (file: File): Promise<void> => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("brand", brand.value.pk);
    const { data, pending, error, refresh } = await useApi({
        path: `${config.public.API_BRAND_LOGO}`,
        method: 'POST',
        data: formData,
        isMultiPart: true 
    })
    brand.value = data.value
}

watch(brandLogoFile, (newFile) => { uploadImage(newFile[0]) })

</script>

<template>
    <div class="d-sm-flex justify-space-between content-wrapper text-center text-sm-left">
        <v-file-input
            v-model="brandLogoFile" 
            class="d-none" 
            ref="brandLogoFileRef" 
            accept="image/png, image/jpeg, image/bmp"
        />
        <div class="brand-logo-size mx-auto mx-sm-0" style="position: relative">
            <v-img 
                class="rounded-circle brand-logo-size border" 
                :src="BrandLogo" 
                :alt="`${brand?.name} logo`"
                @load="loadEmmiter"
                cover
            />
            <v-btn 
                v-if="IsOwner && showAddImgBtn"
                @click="brandLogoFileRef.click()"
                class="add-brand-logo-btn"
                color="primary-alt" 
                size="18" 
                flat 
                icon
            >
                <v-icon size="16">mdi-plus</v-icon>
            </v-btn>
        </div>
        <h2 class="text-h6 text-sm-h5 d-sm-none">
            {{ brand.name }}
        </h2>
        <div class="d-block text-center">
            <h2 class="d-none text-left pl-9 d-sm-block text-sm-h5">
                {{ brand.name }}
            </h2>
            <div class="d-flex justify-center">
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">369</span>
                    <span class="text-body-1">post</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">{{ brand.followers }}</span>
                    <span class="text-body-1">followers</span>
                </div>
            </div>
        </div>
        <v-btn 
            :to="{path: `/brand/edit/${brand.uid}`}"
            color="primary" 
            class="ma-4 d-none d-sm-flex" 
            rounded="pill"
            flat
            :text="!IsOwner ? 'Follow' : 'Edit'"
        />
    </div>
    <v-btn 
        :to="{path: `/brand/edit/${brand.uid}`}"
        color="primary" 
        class="d-sm-none mt-4" 
        rounded="pill"
        block
        size="small"
        flat
        :text="!IsOwner ? 'Follow' : 'Edit'"
    />
</template>

<style scoped>
.content-wrapper {
    max-width: 700px
}

.add-brand-logo-btn {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

.brand-logo-size {
    width: 126px;
    height: 126px;
}

@media screen and (max-width: 1279px) {
    .content-wrapper {
        max-width: 100%
    }
}

@media screen and (max-width: 959px) {
    .brand-logo-size {
        width: 108px;
        height: 108px;
    }
    .content-wrapper {
        max-width: 100%
    }
}

@media screen and (max-width: 599px) {
    .brand-logo-size {
        width: 60px;
        height: 60px;
    }
    .content-wrapper {
        max-width: 100%
    }
    
    .add-brand-logo-btn {
        bottom: 0;
        right: 0;
    }
}
</style>