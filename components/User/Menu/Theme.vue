<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { MenuItem } from '@/utils/types'
import { useTheme } from 'vuetify'

const vTheme = useTheme()
const userMenuStore = useUserMenuStore()
const setTheme = (theme: 'anasaeDark' | 'anasaeLight'): void => { 
    vTheme.global.name.value = theme
    useCookie('theme', {
        path: '/',
        maxAge: 1000000,
        sameSite: 'lax'
    }).value = vTheme.global.name.value
}
const themeItems = ref<MenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-weather-night',
        title: 'Dark theme',
        action: () => { setTheme('anasaeDark') },
        custom: true
    },
    { 
        id: 2, 
        prependIcon: 'mdi-weather-sunny', 
        title: 'Light theme',
        action: () => { setTheme('anasaeLight') },
        custom: false
    },
])
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Theme settings">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.goBack"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact">
        <v-list-item 
            v-for="(item, i) in themeItems"
            :key="i"
            :value="item"
            :title="item.title"
            @click="item?.action"
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <template v-slot:append v-if="item?.custom == vTheme.global.current.value.dark">
                <v-icon icon="mdi-check"></v-icon>
            </template>
        </v-list-item>
    </v-list>
    
</template>