<script lang="ts" setup>
import { UserMenuTheme, UserMenuBrands, UserMenuAccount } from '@/components/User/Menu/components'
import { useUserStore, useUserMenuStore, useAuthStore } from '@/store'
import { useTheme } from 'vuetify'
import { UserMenuItem } from '@/utils/types'

const vTheme = useTheme()
const userStore = useUserStore() 
const userMenuStore = useUserMenuStore()
const authStore = useAuthStore()
const CurrentTheme = computed((): string => vTheme.global.current.value.dark ? 'Dark' : 'Light')
const { Initials: ProfileInitials, Image: ProfileImage } = useProfile()

const accountItems = ref<UserMenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-account-circle-outline', 
        title: 'My profile', 
        to: `/profile/${userStore.user.uid}`,
        action: () => { userMenuStore.isOpen = false }
    },
    { 
        id: 2, 
        prependIcon: 'mdi-storefront-outline', 
        appendIcon: 'mdi-chevron-right',
        title: 'My brands',
        action: () => { userMenuStore.selectedView = UserMenuBrands }
    },
    { 
        id: 3, 
        prependIcon: 'mdi-card-account-details-outline', 
        appendIcon: 'mdi-chevron-right',
        title: 'Account',
        action: () => { userMenuStore.selectedView = UserMenuAccount }
    }
])

const productDataItems = ref<UserMenuItem[]>([
    { id: 1, prependIcon: 'mdi-shopping-outline', title: 'My orders' },
    { id: 2, prependIcon: 'mdi-heart-outline', title: 'Wishlist'}
])

const siteConfigItems = ref<UserMenuItem[]>([
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
            v-for="(item, i) in productDataItems"
            :prepend-icon="item.prependIcon"
            :append-icon="item?.appendIcon"
            :data-test-id="`user-menu-home-product-data-item${i}`"
            :key="i"
            :value="item"
            :title="item.title"
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