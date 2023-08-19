<script lang="ts" setup>
const { isOpen, BackgroundColor } = useUserMenu()
</script>

<template>
    <ActionSheet 
        v-if="$vuetify.display.smAndDown"
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