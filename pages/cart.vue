<script setup lang="ts">
import { useCartStore } from '@/store'

const cartStore = useCartStore()

</script>

<template>
    <div>
        <NuxtLayout name="default">
            <v-container class="px-sm-8" fluid>
                <h1>Cart</h1>
                {{ cartStore.cart }}
            </v-container>
        </NuxtLayout>
    </div>
</template>