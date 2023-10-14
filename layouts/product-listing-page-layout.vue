<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { AuthRouteName as RouteName } from '@/utils/types'
import { useAuthStore, useProductListingStore } from '@/store'

const authStore = useAuthStore()
const productListingStore = useProductListingStore()
const config = useRuntimeConfig()
const route = useRoute()
const isOpen = ref<boolean>(true)
const { AuthFormComponent, authRouteNames } = useAuthFormFactory()
const { smAndDown } = useDisplay()
const scrollY = ref<number>(0)

const AppBarColor = computed((): string => scrollY.value !== 0 ? 'app-bar-color' : '')
const AppBarMobilePos = computed((): string => {
    if (!authStore.isAuth && smAndDown.value) return 'app-bar--relative'
    return 'mobile-top-bar-container'
})
const SetTransparent = computed((): string => scrollY.value == 0 ? 'transparent' : '')
const ShowAuthForm = computed((): boolean => authRouteNames.value.includes(route.name as RouteName) )

const onScroll = (e: any): void => { scrollY.value = window.scrollY }

if (smAndDown.value){
    isOpen.value = false
}

//Selected Product Details
const ProductVariant = computed(() =>  route.query.v ? productListingStore.listing.products.find((x:any) => x.uid == route.query.v) : productListingStore.listing.base_variant)
const ProductVariantImage = computed(() => config.public.CDN_URL+ProductVariant.value.images[0])
const ProductVariantColor = computed(() => ProductVariant.value.specifications.find((x: any) => x.label == 'Color')?.value.toUpperCase())
const ProductVariantSize = computed(() => ProductVariant.value.specifications.find((x: any) => x.label == 'Size')?.value.toUpperCase())
const ProductVariantPrice = computed(() => ProductVariant.value.price/100 )
</script>

<template>
    <v-app id="app" data-test-id="app">
        <v-app-bar :color="SetTransparent" class="app-bar" :class="[AppBarColor, AppBarMobilePos]">
            <v-container class="d-none d-md-flex justify-space-between px-sm-8" fluid>
                <AppBarInner />
            </v-container>
            <v-container 
                v-if="!authStore.isAuth" 
                class="d-flex d-md-none justify-space-between px-sm-8" fluid>
                <AppBarInner />
            </v-container>
            <v-container v-else class="d-md-none px-sm-8" fluid>
                <MobileTopBar />
            </v-container>
        </v-app-bar>
        <v-container v-if="!authStore.isAuth" class="mobile-top-bar-container d-md-none px-sm-8" :class="AppBarColor" fluid>
            <MobileTopBar />
        </v-container>
        <v-navigation-drawer
            v-model="isOpen"
            color="background"
            location="right"
            floating
            :permanent="!smAndDown"
        >
            <v-container class="pt-0">
                <small>Selected product:</small>
                <v-container class="d-flex pa-0 align-start">
                    <v-img 
                        class="bg-surface-el rounded mr-2"
                        :src="ProductVariantImage" 
                        width="50px"
                        max-width="50px"
                        aspect-ratio="1"
                    />
                    <div style="line-height: 0.9rem;">
                        <p><small>color: {{ ProductVariantColor }}</small></p>
                        <p><small>size: {{ ProductVariantSize }}</small></p>
                        <span 
                            class="font-weight-black" 
                            style="position: relative; top: 4px"
                        >
                            ${{ ProductVariantPrice }}
                        </span>
                    </div>
                </v-container>
                <div class="d-flex flex-column mt-4 align-center justify-center bg-surface-el rounded-xl">
                    <span>Select qty</span>
                    <div>
                        <v-btn 
                            class="my-4"
                            variant="outlined"
                            color="primary"
                            flat
                            size="40"
                            icon
                        >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="text-h5 px-4">1</span>
                        <v-btn 
                            class="my-4"
                            color="primary"
                            variant="outlined"
                            flat
                            size="40"
                            icon
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </div>
                <v-btn 
                    class="my-4"
                    rounded="pill"
                    color="primary"
                    text="Add To Cart"
                    flat
                    block
                />
                <div class="nana-primary-bg-color rounded-xl ">
                    <v-btn 
                        rounded="pill"
                        color="background"
                        text="Buy Now"
                        flat
                        block
                    />
                </div>
            </v-container>
        </v-navigation-drawer>
        <v-main class="main-adjust-content" v-scroll="onScroll">
            <slot></slot>
        </v-main>

        <Snackbar />
        <!-- <BottomNav v-if="smAndDown" class="d-md-none w-100" /> -->
        <Auth v-if="ShowAuthForm" >
            <component :is="AuthFormComponent" />
        </Auth> 
        <UserMenuMobile />
    </v-app>
</template>

<style scoped>
.app-bar {
    position: inherit;
}

@media screen and (max-width:  960px) {
    .app-bar{
        position: relative !important;
    }
    .app-bar--relative {
        position: relative !important;
    }
    .app-bar--fixed {
        position: fixed !important;
    }
}

.app-bar::before{
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

.app-bar-color {
    background: rgba(var(--v-theme-background), 0.3) !important;
}

.main-adjust-content {
    padding-top: 0px !important;
}

.mobile-top-bar-container {
    position: sticky !important; 
    top: 0px;
    z-index: 2;
}

.mobile-top-bar-container::before{
    content: "";
    background: inherit;
    position: absolute;
    top: 0;
    left: 0;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

</style>