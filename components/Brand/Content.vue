<script lang="ts" setup>
import { useAuthStore, useBrandStore } from '@/store'
import { Brand } from '@/utils/types'

const config = useRuntimeConfig()
const route = useRoute()
const authStore = useAuthStore()
const brandStore = useBrandStore()
const brandLogoFile = ref()
const brandLogoFileRef = ref()
const showAddImgBtn = ref<boolean>(false)
const isMobileBioOpen = ref<boolean>(false)
const isBrandExist = ref<boolean>(true)

const loadEmmiter = (): void => { showAddImgBtn.value = true }

const UID = computed(() => {
    if (route.fullPath.includes('auth')){
        return authStore.prevRoute.split('/').slice(-1)[0]   
    }
    return route.params.uid
})

const { data: brand, status } = await useApi({
    path: `${config.public.API_BRAND_PAGE}${UID.value}/`,
    method: 'GET',
    key: `${UID.value}`
})

if(status.value == 'error'){
    let brandData: Brand = {
        name: 'Brand does not exist',
        followers: 0,
        pk: 0,
        bio: '',
        uid: '',
        owners: [],
        logo: {pk: 0, image: ''},
        stripe_account_id: ''
    } 
    isBrandExist.value = false
    brand.value = brandData
}

const BrandLogo = computed(() => useGetBrandLogo(brand.value.logo?.image) )

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
    data.value['isOwner'] = true
    brand.value = data.value
    let updatedBrands = brandStore.brands.map(x => {
        if(x.uid == UID.value) { x = data.value }
        return x
    })
    brandStore.brands = updatedBrands
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
                v-if="brand.isOwner && showAddImgBtn"
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
        <BrandDetails 
            class="d-sm-none"
            @openMobileBio="isMobileBioOpen = true"   
            :maxBioHeight="110" 
            :brand="brand" 
        />
        <div v-if="isBrandExist" class="d-block text-center">
            <div class="d-flex justify-center">
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">369</span>
                    <span class="text-body-1">post</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">{{ brand.followers }}</span>
                    <span class="text-body-1">followers</span>
                </div>
                <div class="px-4 d-flex flex-column">
                    <span class="text-body-1">15</span>
                    <span class="text-body-1">products</span>
                </div>
            </div>
        </div>
        <v-btn 
            v-if="isBrandExist"
            :to="{path: `/brand/edit/${brand.uid}`}"
            color="primary" 
            class="d-none d-sm-flex" 
            rounded="pill"
            flat
            :text="!brand.isOwner ? 'Follow' : 'Edit'"
        />
    </div>
    <BrandDetails 
        class="d-none d-sm-block"
        :maxBioHeight="200" 
        :brand="brand" 
    />
    <v-btn 
        v-if="isBrandExist"
        :to="{path: `/brand/edit/${brand.uid}`}"
        color="primary" 
        class="d-sm-none mt-4" 
        rounded="pill"
        block
        size="small"
        flat
        :text="!brand.isOwner ? 'Follow' : 'Edit'"
    />
    <v-dialog
        v-if="isMobileBioOpen && $vuetify.display.xs"
        v-model="isMobileBioOpen"
        data-test-id="brand-edit-dialog" 
        :fullscreen="true"
        transition="dialog-bottom-transition"
        persistent
    >
        <v-card  
            rounded="none"
            class="mobile-dialog-card"
        >
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn 
                        @click="isMobileBioOpen = false" 
                        color="transparent" 
                        size="small" 
                        icon
                    >
                        <v-icon icon="mdi-close" />
                    </v-btn> 
                    
                    <div class="auth-form-logo-container w-100 mr-4"> 
                        <Logo /> 
                    </div>
                </div>
                <v-card-title class="text-h5 py-4">
                    {{ brand.name }} Bio
                </v-card-title>
                <v-card-text>
                    {{ brand?.bio }}
                </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.content-wrapper {
    max-width: 100%
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



@media screen and (max-width: 959px) {
    .brand-logo-size {
        width: 108px;
        height: 108px;
    }

}

@media screen and (max-width: 599px) {
    .brand-logo-size {
        width: 60px;
        height: 60px;
    }
    
    .add-brand-logo-btn {
        bottom: 0;
        right: 0;
    }
}

</style>