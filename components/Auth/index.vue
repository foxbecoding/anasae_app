<script lang="ts" setup>
import { useAuthStore } from '@/store/Auth'

const props = defineProps({
    title: String
})

const authStore = useAuthStore()
const dialog = ref<boolean>(true)

const close = async (): Promise<void> => { 
    dialog.value = false
    setTimeout(() => {
        useRouter().push({name: authStore.prevRoute})
    }, 500) 
}
</script>

<template>
    <v-dialog
        v-model="dialog"
        persistent
        width="500px"
    >
        <v-card height="1000px" rounded="xl">
            <v-container fluid>
                <div class="d-flex justify-space-between align-center">
                    <v-btn @click="close" size="small" icon>
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