<script lang="ts" setup>
import { useUserMenuStore } from '@/store'
import { UserMenuItem } from '@/utils/types'

const userMenuStore = useUserMenuStore()

const menuItems = ref<UserMenuItem[]>([
    { 
        id: 1, 
        prependIcon: 'mdi-weather-night',
        title: 'Details'
    },
    { 
        id: 2, 
        prependIcon: 'mdi-weather-sunny', 
        title: 'Payment Methods'
    },
    { 
        id: 3, 
        prependIcon: 'mdi-weather-sunny', 
        title: 'Addresses'
    },
    { 
        id: 4, 
        prependIcon: 'mdi-weather-sunny', 
        title: 'Chnage password'
    },
])
</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Theme settings">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.goBack()"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-list density="compact">
        <v-list-item 
            v-for="(item, i) in menuItems"
            :key="i"
            :value="item"
            :title="item.title"
            @click="item?.action"
            :to="item?.to"
            :prepend-icon="item.prependIcon"
        >

        </v-list-item>
    </v-list>
    
</template>