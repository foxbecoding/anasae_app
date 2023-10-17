<script lang="ts" setup>
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
    
        <v-btn :to="{name: 'cart'}" value="cart" variant="plain" :ripple="false">
            <v-icon>mdi-cart</v-icon>
            Cart
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


.add-btn {
    position: relative;
    top: 10px;
    height: 36px;
    width: 36px;
    padding: 1px !important;
}
</style>