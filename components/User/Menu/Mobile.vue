<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useUserMenuStore } from '@/store'
import { useTheme } from 'vuetify'

const vTheme = useTheme()
const userMenuStore = useUserMenuStore()
const closeSheet = (e: any) => {
    if (!e){
        userMenuStore.isOpen = false
        userMenuStore.goBack()
    }
}
</script>

<template>
    <ActionSheet 
        v-if="useDisplay().smAndDown.value"
        v-model="userMenuStore.isOpen" 
        fullscreen
        @update:modelValue="closeSheet"
        background-color="surface"
        closeBtnColor="primary"
        isCloseBtn
        :maxHeight="95"
        :start-height="100"
        rounded="xl"
    >
        <UserMenu />
    </ActionSheet>
</template>