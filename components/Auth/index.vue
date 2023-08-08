<script lang="ts" setup>
import { useAuthStore } from '@/store/Auth'
import { useDisplay } from 'vuetify'

const props = defineProps({
    title: String
})

const authStore = useAuthStore()
const dialog = ref<boolean>(true)
const IsFullscreen = computed((): boolean => useDisplay().xs.value ) 

const close = async (): Promise<void> => { 
    dialog.value = false
    setTimeout(() => {
        useRouter().push({name: authStore.prevRoute})
    }, 300) 
}
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
                    <v-btn @click="close" color="transparent" size="small" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn> 
                    
                    <div class="auth-form-logo-container w-100 mr-4"> 
                        <Logo /> 
                    </div>
                </div>
                <v-card-title class="text-h5">
                    {{props.title}} 
                </v-card-title>
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