<script lang="ts" setup>
const props = defineProps(['listing']) 
const config = useRuntimeConfig()
</script>

<template>
    <v-card 
        :to="{
            name: 'product-lid', 
            params:{lid: props.listing['uid']}, 
            query: {v: `${props.listing.base_variant.uid}`}
        }"
        color="transparent"
        rounded="lg"
    >
        <v-img 
            :src="config.public.CDN_URL+props.listing.image" 
            class="pb-2 rounded-lg product-listing-img" 
            cover 
            aspect-ratio="1"
        >
            <v-btn 
                @click.prevent="false"
                class="cart-btn"
                variant="flat" 
                active 
                icon 
                size="40px"
            >
                <v-icon size="20px">mdi-cart-plus</v-icon>
            </v-btn>
        </v-img>
        <div class="pl-2 pb-2">
            <v-card-title class="text-body-2 px-0 pb-0">{{ props.listing.title }}</v-card-title>
            <span class="font-weight-black text-h5">${{ props.listing.base_variant.price.price/100 }}</span>
        </div>
    </v-card>
</template>