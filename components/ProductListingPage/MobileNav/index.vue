<script lang="ts" setup>
// const config = useRuntimeConfig()
const { 
    ProductVariant,
    SelectedProductVariantImage,
    SelectedProductVariantColor,
    SelectedProductVariantSize,
    SelectedProductVariantPrice, 
    qty, 
    qtyHandler  
} = useProductListingPage()
</script>

<template>
    <v-app-bar 
        :height="$vuetify.display.xs ? 140 : 100"
        class="bottom-nav d-block" 
        elevation="0"
        location="bottom"
    >
        <div class="d-flex flex-column flex-sm-row w-100 align-center">
            <v-container class="pb-0 pt-4 pt-sm-0" fluid>
                <small>Selected product:</small>
                <div class="d-flex align-start ">
                    <v-img 
                        class="bg-surface-el rounded mr-2"
                        :src="$config.public.CDN_URL+SelectedProductVariantImage" 
                        width="50px"
                        max-width="50px"
                        aspect-ratio="1"
                    />
                    <div style="line-height: 0.9rem;">
                        <p><small>color: {{ SelectedProductVariantColor }}</small></p>
                        <p><small>size: {{ SelectedProductVariantSize }}</small></p>
                        <span 
                            class="font-weight-black" 
                            style="position: relative; top: 4px"
                        >
                            ${{ SelectedProductVariantPrice }}
                        </span>
                    </div>
                </div>
            </v-container>
            <v-container class="py-0 d-flex aling-end justify-space-between" >
                <v-btn 
                    class="my-4"
                    rounded="pill"
                    color="primary"
                    size="30"
                    icon
                    flat
                    variant="flat"
                    :disabled="qty == 0"
                >
                    <v-icon size="20">mdi-cart-plus</v-icon>
                </v-btn>
                <div 
                    class=" flex-fill nana-primary-bg-color rounded-xl my-4 mx-2"
                    style="height:30px"
                >
                    <v-btn
                        class="rounded-xl background-bg" 
                        height="26"
                        variant="flat" 
                        block
                        :disabled="qty == 0"
                    >
                        Buy now
                    </v-btn>
                </div>
                <v-spacer />
                <div class="d-flex pa-0 align-center justify-center">
                    <div>
                        <v-btn 
                            @click="qtyHandler('-')"
                            variant="outlined"
                            color="primary"
                            flat
                            size="30"
                            icon
                        >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span 
                            class="text-h6 px-1"
                            style="position: relative; top: 3px;"
                        >
                            {{ qty }}
                        </span>
                        <v-btn
                            @click="qtyHandler('+')"
                            color="primary"
                            variant="outlined"
                            flat
                            size="30"
                            icon
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </div>
    </v-app-bar>
</template>
