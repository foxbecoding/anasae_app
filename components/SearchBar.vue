<script setup lang="ts">
import { useAuthStore, useUserMenuStore, useUserStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()

const { Initials: ProfileInitials, Image: ProfileImage } = useProfile()
const { Asset: logoIcon } = useMediaAssets('/media/assets/icon-dark-v1.png') 

</script>

<template>
    <v-card 
        class="w-100 surface-bg--searchbar"
        rounded="pill" 
        height="44px"
        density="compact"
    >
        <v-form>
            <v-text-field
                density="compact"
                flat
                placeholder="Search"
                variant="solo-filled" 
                bg-color="transparent"
            >
                <template v-slot:prepend-inner>
                    <v-btn 
                        data-test-id="search-bar-mobile-profile-btn"
                        class="rounded-xl search-bar-logo"
                        height="38px"
                        width="38px"
                        icon
                        flat
                        variant="plain"
                        active
                    >
                        <v-avatar size="30px">
                            <v-img  
                                class="pa-1"
                                :src="logoIcon" 
                                alt="Anasae logo"
                            />
                        </v-avatar>
                    </v-btn>
                </template>
                <template v-slot:append-inner>
                    <v-btn 
                        v-if="authStore.isAuth && !$vuetify.display.mdAndUp"
                        @click="userMenuStore.isOpen = true"
                        data-test-id="search-bar-mobile-profile-btn"
                        class="rounded-xl ml-2 search-bar-btn-right"
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
                    </v-btn>
                    <v-btn 
                        v-else
                        data-test-id="search-bar-mobile-search-btn"
                        class="rounded-xl ml-2 search-bar-btn-right"
                        color="bg-transparent"
                        height="38px"
                        width="38px"
                        icon="mdi-magnify"
                        flat
                        variant="plain"
                        active
                    >
                        
                    </v-btn>
                    <!-- <v-icon v-else>mdi-magnify</v-icon> -->
                </template>
            </v-text-field>
        </v-form>   
    </v-card> 
</template>

<style scoped>
.search-bar-btn-right {
    right: -8px !important;
}
.search-bar-logo {
    left: -8px !important;
}
</style>