<script setup lang="ts">
import { useCartStore, useAuthStore } from '@/store'

if(!useAuthStore().isAuth){ navigateTo('/') }

const config = useRuntimeConfig()
const cartStore = useCartStore()

</script>

<template>
    <div>
        <NuxtLayout name="default">
            <v-container class="px-sm-8" fluid>
                <h1>Cart</h1>
                <!-- {{ cartStore.cart }} -->
                <v-list lines="one" class="border rounded-lg" bg-color="background">
                    <v-list-item
                        v-for="(cartItem, i) in cartStore.cart"
                        :key="i"
                    >
                        <div class="d-flex align-center">
                            <div class="bg-surface-el" style="width: 50px; height: 50px">
                                <v-img 
                                    :src="config.public.CDN_URL+cartItem.item.images[0]"
                                />
                            </div>
                            <div>
                                <v-card-title v-text="cartItem.item.title" />
                                <v-card-subtitle v-text="cartItem.item.variant" />
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-container>
        </NuxtLayout>
    </div>
</template>