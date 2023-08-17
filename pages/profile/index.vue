<script setup lang="ts">
import { useAuthStore, useUserStore } from '@/store'

if (useAuthStore().isAuth){
    navigateTo(`/profile/${useUserStore().user.uid}`)
}else{
    navigateTo('/')
}

</script>

<template>
</template>