<script lang="ts" setup>
import { useAuthStore } from '@/store'
import { useDisplay } from 'vuetify'

const route = useRoute()
const authStore = useAuthStore()
const dialog = ref<boolean>(false)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 
onMounted(() => dialog.value = true)

const close = async (): Promise<void> => { 
    dialog.value = false
    setTimeout(() => {
        navigateTo(authStore.prevRoute)
    }, 300) 
}

const prevStep = (): void => { authStore.signUpFormStep-- }

const DialogButtonFunc = computed((): Function => {
    if (route.name == 'auth-sign-up' 
    && authStore.signUpFormStep > 1 
    && !authStore.signUpCompleted){
        return prevStep
    }
    return close
})

const DialogButtonIcon = computed((): string => {
    if(route.name == 'auth-sign-up' 
    && authStore.signUpFormStep > 1 
    && !authStore.signUpCompleted){
        return 'mdi-arrow-left'
    }
    return 'mdi-close'
})
</script>

<template>
    <v-dialog
        v-model="dialog"
        data-test-id="auth" 
        :fullscreen="IsFullscreen"
        :width="IsFullscreen ? '600px': '500px'"
        :transition="IsFullscreen ? 'dialog-bottom-transition' : 'fade-transition'"
        persistent
    >
        <v-card 
            height="1000px" 
            :rounded="IsFullscreen ? 'none' : 'xl'"
            :class="IsFullscreen ? 'mobile-dialog-card' : ''"
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
</style>