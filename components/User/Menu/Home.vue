<script lang="ts" setup>
import { useUserStore } from '@/store'

const userStore = useUserStore() 
const { DefaultProfileImg } = useDefaultProfileImg()
const { 
    homeAccountItems,
    BackgroundColor, 
    homeSiteConfigItems
} = useUserMenu()

const ProfileImage = computed(() => { 
    if (userStore.user?.image['image']) {
        const { Asset } = useMediaAssets(userStore.user?.image['image'])  
        return Asset.value
    }
    return DefaultProfileImg.value 
})

</script>

<template>
    <v-list :bg-color="BackgroundColor">
        <v-list-item
            :prepend-avatar="ProfileImage"
            :title="userStore.user?.username"
            :subtitle="userStore.user?.email"
        >
            <template v-slot:prepend>
                <v-avatar class="border">
                    <v-img  
                        :src="ProfileImage" 
                        :alt="`${userStore.user?.username} profile image`"
                    />
                </v-avatar>   
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="BackgroundColor">
        <v-list-item 
            v-for="(item, i) in homeAccountItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
            @click="item?.action"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact" :bg-color="BackgroundColor">
        <v-list-item 
            v-for="(item, i) in homeSiteConfigItems"
            :key="i"
            :value="item"
            title=""
            :to="item?.to"
            @click="item?.action"
        >
            <template v-slot:prepend>
                <v-icon :icon="item.prependIcon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text" />
            <template v-slot:append>
                <v-icon :icon="item?.appendIcon"></v-icon>
            </template>
        </v-list-item>
    </v-list>
</template>