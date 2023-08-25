<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'
import { useAuthStore, useUserMenuStore, useUserStore } from '@/store'
import UserMenu from '../User/Menu/index.vue'

const vTheme = useTheme()  
const { mdAndUp } = useDisplay()      
const authStore = useAuthStore()
const userMenuStore = useUserMenuStore()
const userStore = useUserStore()
const { Initials: ProfileInitials, Image: ProfileImage } = useProfile()

const toggleTheme = (): void => {
    vTheme.global.name.value = vTheme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
}

const ThemeIcon = computed((): string => vTheme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night')

</script>

<template>
    <div id="end" class="d-flex flex-row align-center justify-content-end">
        <NanaAppBarBtn
            v-if="!authStore.isAuth" 
            data-test-id="app-bar-inner-end-sign-in-btn" 
            class="rounded-xl" 
            active
            @click="`${authStore.setPrevRouteData($route.fullPath, $route.name) }`"
            :to="{name: 'auth-login'}"
        >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
            Sign In
        </NanaAppBarBtn>
        <div 
            v-if="authStore.isAuth" 
            class="nana-primary-bg-color rounded-xl d-none d-md-block"
            data-test-id="app-bar-inner-add-post-btn"
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
            v-if="mdAndUp"
            v-model="userMenuStore.isOpen"
            :close-on-content-click="false"
            location="end"
            @update:modelValue="userMenuStore.updateMenu"
        >
            <template v-slot:activator="{ props }">
                <NanaAppBarBtn 
                    v-if="authStore.isAuth"
                    v-bind="props"
                    data-test-id="app-bar-inner-end-profile-btn"
                    class="ml-2 d-none d-md-flex"
                    height="38px"
                    width="38px"
                    icon
                    active
                >
                    <v-avatar
                        :color="!ProfileImage ? 'primary-alt' : ''"
                        size="38px" 
                    >
                        
                        <v-img  
                            v-if="ProfileImage"
                            :src="ProfileImage" 
                            :alt="`${userStore.user?.username} profile image`"
                        />
                        <span v-else class="text-h5">{{ ProfileInitials }}</span>
                    </v-avatar>
                </NanaAppBarBtn>
            </template>
            <v-card width="300" rounded="xl">
                <UserMenu />
            </v-card>
        </v-menu>

        <NanaAppBarBtn 
            v-if="authStore.isAuth && !mdAndUp"
            @click="userMenuStore.isOpen = true"
            data-test-id="app-bar-inner-end-mobile-profile-btn"
            class="rounded-xl ml-2"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-avatar
                :color="!ProfileImage ? 'primary-alt' : ''"
                size="38px" 
            >
                <v-img  
                    v-if="ProfileImage"
                    :src="ProfileImage" 
                    :alt="`${userStore.user?.username} profile image`"
                />
                <span v-else class="text-h5">{{ ProfileInitials }}</span>
            </v-avatar>
        </NanaAppBarBtn>

        <NanaAppBarBtn 
            v-if="!authStore.isAuth"
            data-test-id="app-bar-inner-end-theme-toggle-btn"       
            @click="toggleTheme()" 
            class="rounded-xl ml-2"
            height="38px"
            width="38px"
            icon
            active
        >
            <v-icon>{{ ThemeIcon }}</v-icon>
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