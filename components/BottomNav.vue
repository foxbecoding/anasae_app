<template>
    <v-bottom-navigation 
        class="bottom-nav pb-3"
        height="70"
        grow
    >
        <v-btn value="recent" variant="plain" :ripple="false">
            <v-icon>mdi-home</v-icon>
            Home
        </v-btn>
    
        <v-btn value="favorites" variant="plain" :ripple="false">
            <v-icon>mdi-account-circle</v-icon>
            Account
        </v-btn>

        <div class="nana-primary-bg-color rounded-xl add-btn">
            <v-btn 
                class="rounded-xl background-bg" 
                height="34" 
                width="34"
                min-width="34" 
                variant="flat" 
                :ripple="false" icon
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    
        <v-btn value="nearby" variant="plain" :ripple="false">
            <v-icon>mdi-magnify</v-icon>
            Search
        </v-btn>
        
        <v-btn value="nearby" variant="plain" :ripple="false">
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

.add-btn {
    position: relative;
    top: 6px;
    height: 36px;
    width: 36px;
    padding: 1px !important;
}
</style>