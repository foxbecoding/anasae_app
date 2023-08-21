<script lang="ts" setup>
import { UserMenuTheme } from '@/components/User/Menu/components'
import { useUserStore, useUserMenuStore } from '@/store'
import { useTheme } from 'vuetify'
import { UserMenuItem } from '@/utils/types'

const vTheme = useTheme()
const userStore = useUserStore() 
const userMenuStore = useUserMenuStore()
const CurrentTheme = computed((): string => vTheme.global.current.value.dark ? 'Dark' : 'Light')
const BackgroundColor = computed((): string => vTheme.global.current.value.dark ? 'surface' : 'background')
const { DefaultProfileImg } = useDefaultProfileImg()

const accountItems = ref<UserMenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-account-circle-outline', 
        text: 'Your profile', 
        to: `/profile/${userStore.user.uid}`,
        action: () => { userMenuStore.isOpen = false }
    },
    { id: 2, prependIcon: 'mdi-storefront-outline', text: 'Your brands'},
    { id: 3, prependIcon: 'mdi-storefront-plus-outline', text: 'Create a brand'},
    { id: 4, prependIcon: 'mdi-logout-variant', text: 'Sign out'}
])

const siteConfigItems = ref<UserMenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-theme-light-dark', 
        appendIcon: 'mdi-chevron-right',
        text: `Theme: ${CurrentTheme.value}`, 
        action: function() {
            userMenuStore.selectedView = UserMenuTheme
        }
    },
])

const ProfileImage = computed(() => { 
    if (userStore.user?.image?.image) {
        const { Asset } = useMediaAssets(userStore.user?.image['image'])  
        return Asset.value
    }
    return DefaultProfileImg.value 
})

</script>

<template>
    <v-list :bg-color="BackgroundColor">
        <v-list-item
            :prepend-avatar="ProfileImage"
            :title="userStore.user?.username"
            :subtitle="userStore.user?.email"
        >
            <template v-slot:prepend>
                <v-avatar class="border">
                    <v-img  
                        :src="ProfileImage" 
                        :alt="`${userStore.user?.username} profile image`"
                    />
                </v-avatar>   
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="BackgroundColor">
        <v-list-item 
            v-for="(item, i) in accountItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
            @click="item?.action"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="BackgroundColor">
        <v-list-item 
            v-for="(item, i) in siteConfigItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
            @click="item?.action"
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