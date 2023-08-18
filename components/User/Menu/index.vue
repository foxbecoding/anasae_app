<script lang="ts" setup>
import UserMenuHome from './Home'

const { 
    homeAccountItems, 
    isLightTheme, 
    ListBgColor, 
    homeSiteConfigItems 
} = useUserMenu()

</script>

<template>
    <component :is="UserMenuHome" />
</template>