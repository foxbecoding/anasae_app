<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useAuthStore, useUserStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
const theme = useTheme()        
const { DefaultProfileImg } = useDefaultProfileImg()
const profileMenu = ref<boolean>(false) 
const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const THEME_ICON = computed((): string => theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')

</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <NanaAppBarBtn
            v-if="!authStore.isAuth" 
            data-test-id="app-bar-inner-end-sign-btn" 
            class="rounded-xl" 
            active
            @click="`${authStore.prevRoute = $route.fullPath}`"
            :to="{name: 'auth-login'}"
        >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
            Sign In
        </NanaAppBarBtn>
        <div 
            v-if="authStore.isAuth" 
            class="nana-primary-bg-color rounded-xl d-none d-md-block"
        >
            <v-btn 
                value="add"
                class="rounded-xl background-bg" 
                height="34" 
                width="34"
                min-width="34" 
                variant="flat" 
                icon
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>

        <v-menu
            v-model="profileMenu"
            :close-on-content-click="false"
            location="end"
        >
            <template v-slot:activator="{ props }">
                <NanaAppBarBtn 
                    v-if="authStore.isAuth"
                    v-bind="props"
                    
                    data-test-id="app-bar-inner-end-profile-btn"
                    class="rounded-xl ml-2"
                    height="38px"
                    width="38px"
                    icon
                    active
                >
                    <v-icon>mdi-account-circle-outline</v-icon>
                </NanaAppBarBtn>
            </template>
            <v-card width="300" rounded="xl">
                <v-list>
                    <v-list-item
                        :prepend-avatar="userStore.user?.image ? userStore.user?.image : DefaultProfileImg"
                        :title="userStore.user?.username"
                        :subtitle="userStore.user?.email"
                    >
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        variant="text"
                        @click="profileMenu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        variant="text"
                        @click="profileMenu = false"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>

        <NanaAppBarBtn 
            v-if="!authStore.isAuth"
            data-test-id="app-bar-inner-end-theme-toggle-btn"       
            @click="toggleTheme()" 
            class="rounded-xl ml-2 d-none d-sm-block"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>{{ THEME_ICON }}</v-icon>
        </NanaAppBarBtn>

        <NanaAppBarBtn
            data-test-id="app-bar-inner-end-cart-btn" 
            class="rounded-xl d-none d-md-flex ml-2"
            :to="{name: 'cart'}"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>mdi-cart-outline</v-icon>
        </NanaAppBarBtn>   
    </div>
</template>