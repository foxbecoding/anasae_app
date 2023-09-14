<script lang="ts" setup>
import { UserMenuTheme, UserMenuBrands, UserMenuAccount } from '@/components/User/Menu/components'
import { useUserStore, useUserMenuStore } from '@/store'
import { useTheme } from 'vuetify'
import { MenuItem } from '@/utils/types'

const vTheme = useTheme()
const userStore = useUserStore() 
const userMenuStore = useUserMenuStore()
const CurrentTheme = computed((): string => vTheme.global.current.value.dark ? 'Dark' : 'Light')
const { Initials: ProfileInitials, Image: ProfileImage } = useProfile()

const accountItems = ref<MenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-card-account-details-outline', 
        appendIcon: 'mdi-chevron-right',
        title: 'Your account',
        action: () => { userMenuStore.selectedView = UserMenuAccount },
        show: true
    },
    { 
        id: 2, 
        prependIcon: 'mdi-storefront-outline', 
        title: 'Brand center',
        to: {name: 'brand-center'},
        action: () => { userMenuStore.isOpen = false },
        show: userStore.user.owned_brands.length > 0
    },
    { 
        id: 3, 
        prependIcon: 'mdi-shopping-outline', 
        title: 'Your orders', 
        action: () => { userMenuStore.isOpen = false },
        show: true 
    },
    { 
        id: 4, 
        prependIcon: 'mdi-heart-outline', 
        title: 'Wishlist', 
        action: () => { userMenuStore.isOpen = false },
        show: true
    }
])

const siteConfigItems = ref<MenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-theme-light-dark', 
        appendIcon: 'mdi-chevron-right',
        title: `Theme: ${CurrentTheme.value}`, 
        action: () => { userMenuStore.selectedView = UserMenuTheme }
    },
])


</script>

<template>
    <v-list>
        <v-list-item
            :title="userStore.user?.username"
            :subtitle="userStore.user?.email"
        >
            <template v-slot:prepend>
                <v-avatar
                    :color="!ProfileImage ? 'primary-alt' : ''"
                    size="38px" 
                    class="border"
                >
                    <v-img  
                        v-if="ProfileImage"
                        :src="ProfileImage" 
                        :alt="`${userStore.user?.username} profile image`"
                        cover
                    />
                    <span v-else class="text-h5">{{ ProfileInitials }}</span>
                </v-avatar>   
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact">
        <v-list-item 
            v-for="(item, i) in accountItems"
            v-show="item.show"
            :prepend-icon="item.prependIcon"
            :append-icon="item?.appendIcon"
            :data-test-id="`user-menu-home-account-item${i}`"
            :key="i"
            :value="item"
            :title="item.title"
            :to="item?.to"
            @click="item?.action"
        >
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact">
        <v-list-item 
            v-for="(item, i) in siteConfigItems"
            :prepend-icon="item.prependIcon"
            :append-icon="item?.appendIcon"
            :key="i"
            :value="item"
            :title="item.title"
            :to="item?.to"
            @click="item?.action"
        >
        </v-list-item>
    </v-list>
</template>