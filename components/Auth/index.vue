<script lang="ts" setup>
import { useAuthStore } from '@/store/Auth'
import { useDisplay } from 'vuetify'

const props = defineProps({
    title: String
})

const route = useRoute()
const authStore = useAuthStore()
const dialog = ref<boolean>(true)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 

const close = async (): Promise<void> => { 
    dialog.value = false
    setTimeout(() => {
        useRouter().push({name: authStore.prevRoute})
    }, 300) 
}

const prevStep = (): void => {
    authStore.signUpFormStep--
}

const DialogButtonFunc = computed((): Function => {
    if (route.name == 'auth-sign-up' && authStore.signUpFormStep > 1){
        return prevStep
    }
    return close
})

const DialogButtonIcon = computed((): string => route.name == 'auth-sign-up' && authStore.signUpFormStep > 1 ? 'mdi-arrow-left' : 'mdi-close')
</script>

<template>
    <v-dialog
        v-model="dialog"
        :fullscreen="IsFullscreen"
        :width="IsFullscreen ? '600px': '500px'"
        :transition="IsFullscreen ? 'dialog-bottom-transition' : ''"
        persistent
    >
        <v-card 
            height="1000px" 
            :rounded="IsFullscreen ? 'none' : 'xl'"
            :class="IsFullscreen ? 'auth-card' : ''"
        >
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn 
                        @click="DialogButtonFunc" 
                        color="transparent" 
                        size="small" 
                        icon
                    >
                        <v-icon :icon="DialogButtonIcon" />
                    </v-btn> 
                    
                    <div class="auth-form-logo-container w-100 mr-4"> 
                        <Logo /> 
                    </div>
                </div>
                <v-card-text> <slot /> </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.auth-card {
    background: rgba(var(--v-theme-background), 0.8) !important;
    -webkit-backdrop-filter: blur(5px);
    -moz-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
}
</style>