<script lang="ts" setup>
import { useAuthStore, useUserStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
 
const { DefaultProfileImg } = useDefaultProfileImg()
const { 
    homeAccountItems, 
    isLightTheme, 
    ListBgColor, 
    homeSiteConfigItems 
} = useUserMenu()

</script>

<template>
    <v-list :bg-color="ListBgColor">
        <v-list-item
            :prepend-avatar="userStore.user?.image ? userStore.user?.image : DefaultProfileImg"
            :title="userStore.user?.username"
            :subtitle="userStore.user?.email"
        >
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="ListBgColor">
        <v-list-item 
            v-for="(item, i) in homeAccountItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="ListBgColor">
        <v-list-item 
            v-for="(item, i) in homeSiteConfigItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
            <template v-slot:append>
                <v-icon :icon="item?.appendIcon"></v-icon>
            </template>
        </v-list-item>
    </v-list>
    
</template>