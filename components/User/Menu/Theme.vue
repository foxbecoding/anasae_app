<script lang="ts" setup>
 
const { DefaultProfileImg } = useDefaultProfileImg()
const { 
    homeAccountItems, 
    isLightTheme, 
    ListBgColor, 
    homeSiteConfigItems 
} = useUserMenu()

</script>

<template>
    <v-list :bg-color="ListBgColor">
        <v-list-item
            title="Theme settings"
        >
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="ListBgColor">
        <v-list-item 
            v-for="(item, i) in homeAccountItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
        </v-list-item>
    </v-list>
    
</template>