<script lang="ts" setup>
import { useAuthStore } from '@/store/Auth'

const authStore = useAuthStore()
const ToProfile = computed((): string => authStore.isAuth ? 'profile' : 'auth-login')

</script>

<template>
    <v-bottom-navigation 
        class="bottom-nav pb-3"
        height="70"
        grow
        elevation="0"
    >
        
        <v-btn :to="{name: 'index'}" value="home" variant="plain" :ripple="false">
            <v-icon>mdi-home</v-icon>
            Home
        </v-btn>
    
        <v-btn 
            @click="`${authStore.prevRoute = $route.name as string}`"
            :to="{name: ToProfile}" 
            value="profile" 
            variant="plain" 
            :ripple="false"
        >
            <v-icon>mdi-account</v-icon>
            Profile
        </v-btn>

        <div class="nana-primary-bg-color rounded-xl add-btn">
            <v-btn 
                value="add"
                class="rounded-xl background-bg" 
                height="34" 
                width="34"
                min-width="34" 
                variant="flat" 
                icon
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    
        <v-btn :to="{name: 'search'}" value="search" variant="plain" :ripple="false">
            <v-icon>mdi-magnify</v-icon>
            Search
        </v-btn>
        
        <v-btn :to="{name: 'clipz'}" value="clipz" variant="plain" :ripple="false">
            <v-icon>mdi-movie-play</v-icon>
            Clipz
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.bottom-nav {
    background: rgba(var(--v-theme-background),0.3);
}
.bottom-nav::before{
    content: "";
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.add-btn {
    position: relative;
    top: 10px;
    height: 36px;
    width: 36px;
    padding: 1px !important;
}
</style>