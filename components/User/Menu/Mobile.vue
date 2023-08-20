<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const { isOpen, BackgroundColor } = useUserMenu()
</script>

<template>
    <ActionSheet 
        v-if="useDisplay().smAndDown.value"
        v-model="isOpen" 
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