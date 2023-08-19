<script lang="ts" setup>
 
const { DefaultProfileImg } = useDefaultProfileImg()
const { 
    goBack,
    BackgroundColor,
    isLightTheme,
    themeItems
} = useUserMenu()

</script>

<template>
    <v-list :bg-color="BackgroundColor">
        <v-list-item class="pl-1" title="Theme settings">
            <template v-slot:prepend>
                <v-btn 
                    @click="goBack"
                    icon="mdi-arrow-left"
                    variant="plain"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="BackgroundColor">
        <v-list-item 
            v-for="(item, i) in themeItems"
            :key="i"
            :value="item"
            title=""
            @click="item?.action"
            :to="item?.to"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
            <template v-slot:append v-if="item.text == 'Light theme' && isLightTheme">
                <v-icon icon="mdi-check"></v-icon>
            </template>
            <template v-slot:append v-if="item.text == 'Dark theme' && !isLightTheme">
                <v-icon icon="mdi-check"></v-icon>
            </template>
        </v-list-item>
    </v-list>
    
</template>