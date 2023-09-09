<script lang="ts" setup>
import { UserMenuAccount } from '../components'
import { FormTextField, FormButton } from '@/utils/types'
import { useUserStore, useSnackbarStore, useUserMenuStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const snackbarStore = useSnackbarStore() 
const userMenuStore = useUserMenuStore()
const { DefaultProfileImg } = useDefaultProfileImg()
const profileImgFile = ref()
const profileImgFileRef = ref()
const formError = reactive({ isError: false, message:'' })
const showAddImgBtn = ref<boolean>(false)
const imgLoadEmmiter = (): void => { showAddImgBtn.value = true }

const formButton = reactive<FormButton>({
    show: true,
    label: 'Submit',
    class: "text-background", 
    color: "primary",
    rounded:"pill", 
    block: true, 
    flat: true
} as FormButton)

const fields = ref<FormTextField[]>([
    {
        bgColor: 'form-field-flat',
        flat: true,
        id: 1, 
        model: userStore.user.first_name || '', 
        name:'first_name', 
        label: 'First name', 
        density: 'compact',
        color: 'primary',
        type: 'text', 
        counter: 30,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        rules: [ 
            (v: any) => !! v || 'First name is required',
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ]
    },
    {
        bgColor: 'form-field-flat',
        flat: true,
        id: 2, 
        model: userStore.user.last_name || '', 
        name:'last_name', 
        label: 'Last name', 
        density: 'compact',
        color: 'primary',
        type: 'text', 
        counter: 30,
        errorMessages: '',
        inputType: 'TEXTFIELD',
        variant: 'solo',
        rules: [ 
            (v: any) => !! v || 'Last name is required', 
            (v: any) => v.length <= 30 || 'Must be 30 characters or less'
        ],
    },
])

const submitEmitter = (e: any): void => {
    if (e.status == 'error'){
        if('errors' in e.error.data){
            formError.isError = true
            let errors: string[] = e.error.data.errors
            formError.message = errors.toString()
        }else{
            fields.value.map(x => {
                if(x.name && x.name in e.error.data){ 
                    let errors: string[] = e.error.data[x.name]
                    x.errorMessages = errors
                }
            })
        }
        return 
    }

    fields.value.map(x =>  x.errorMessages = '')
    formError.isError = false
    formError.message = ''
    userStore.user = e.data
    snackbarStore.setSnackbar('Account details updated', true)
}

const ProfileImage = computed(() => {
    if (userStore.user.image) {
        const { Asset } = useMediaAssets(userStore.user.image.image)  
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
    userStore.user = data.value
    snackbarStore.setSnackbar('Image uploaded', true)
}

watch(profileImgFile, (newFile) => { uploadImage(newFile[0]) })

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Edit account details">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = UserMenuAccount"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-container>
        <v-file-input
            v-model="profileImgFile" 
            class="d-none" 
            ref="profileImgFileRef" 
            accept="image/png, image/jpeg, image/bmp"
        />
        <v-container class="mx-auto pt-0" style="position: relative; width: 120px">
            <v-img 
                class="rounded-circle border" 
                :src="ProfileImage" 
                :alt="`${userStore.user.username} profile image`"
                @load="imgLoadEmmiter"
                width="120"
                cover
            />
            <v-btn 
                v-if="showAddImgBtn"
                style="position: absolute; bottom: 20px; right: 20px;"
                @click="profileImgFileRef.click()"
                class="add-profile-image-btn"
                color="primary-alt" 
                size="18" 
                flat 
                icon
            >
                <v-icon size="16">mdi-plus</v-icon>
            </v-btn>
        </v-container>
        <FormFields
            @submit="submitEmitter"
            :fields="fields" 
            :formButton="formButton"
            :apiPath="`${config.public.API_USER}/${useUserStore().user.pk}/`"
            apiMethod="PATCH"
        />
        <v-alert
            v-model="formError.isError"
            :closable="true"
            class="mt-4"
            type="error"
            title="Something went wrong"
            rounded="lg"
            :text="formError.message"
            :icon="false"
        />
    </v-container>
</template>