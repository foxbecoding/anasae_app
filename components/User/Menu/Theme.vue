<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { UserMenuItem } from '@/utils/types'
import { useTheme } from 'vuetify'

const vTheme = useTheme()
const userMenuStore = useUserMenuStore()
const setTheme = (theme: 'anasaeDark' | 'anasaeLight'): void => { vTheme.global.name.value = theme}
const themeItems = ref<UserMenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-weather-night',
        text: 'Dark theme',
        action: () => { setTheme('anasaeDark') },
        custom: true
    },
    { 
        id: 2, 
        prependIcon: 'mdi-weather-sunny', 
        text: 'Light theme',
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
            title=""
            @click="item?.action"
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
            <template v-slot:append v-if="item?.custom == vTheme.global.current.value.dark">
                <v-icon icon="mdi-check"></v-icon>
            </template>
        </v-list-item>
    </v-list>
    
</template>