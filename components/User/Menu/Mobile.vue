<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useUserMenuStore } from '@/store'
import { useTheme } from 'vuetify'

const vTheme = useTheme()
const userMenuStore = useUserMenuStore()
const BackgroundColor = computed((): string => vTheme.global.current.value.dark ? 'surface' : 'background')
</script>

<template>
    <ActionSheet 
        v-if="useDisplay().smAndDown.value"
        v-model="userMenuStore.isOpen" 
        fullscreen
        :background-color="BackgroundColor"
        closeBtnColor="primary"
        isCloseBtn
        :maxHeight="100"
        :start-height="100"
        rounded="xl"
    >
        <UserMenu />
    </ActionSheet>
</template>