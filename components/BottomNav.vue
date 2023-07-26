<template>
    <v-bottom-navigation 
        class="bottom-nav pb-3"
        height="70" 
        grow
    >
        <v-btn value="recent">
            <v-icon>mdi-home</v-icon>
            Home
        </v-btn>
    
        <v-btn value="favorites">
            <v-icon>mdi-account-circle</v-icon>
            Account
        </v-btn>
    
        <v-btn value="nearby">
            <v-icon>mdi-magnify</v-icon>
            Search
        </v-btn>
        
        <v-btn value="nearby">
            <v-icon>mdi-movie-play</v-icon>
            Clipz
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.bottom-nav {
    background: rgba(255,255,255,0.05);
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
</style>