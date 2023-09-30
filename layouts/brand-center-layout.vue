<script setup lang="ts">
import { MenuItem, Brand } from '@/utils/types'
import { useUserStore, useBrandStore } from '@/store'
import { useDisplay } from 'vuetify'

const config = useRuntimeConfig()
const route = useRoute()
const { smAndDown } = useDisplay()
const userStore = useUserStore()
const brandStore = useBrandStore()
const rail = ref<boolean>(false)
const isMenuOpen = ref<boolean>(false)
const navItems = ref<MenuItem[]>([
{ 
        id: 1, 
        prependIcon: 'mdi-view-dashboard-outline', 
        title: 'Dashboard',
        to: {name: 'brand-center'}
    },
    { 
        id: 2, 
        prependIcon: 'mdi-storefront-outline', 
        title: 'Brand details',
        to: {name: 'brand-center-brand-details'}
    },
    { 
        id: 3, 
        prependIcon: 'mdi-shopping-outline', 
        title: 'Product listings',
        to: {name: 'brand-center-product-listings'}
    },
    { 
        id: 4, 
        prependIcon: 'mdi-store-cog-outline', 
        title: 'Manage orders',
        to: {name: 'brand-center-manage-orders'}
    },
])

const BrandData = computed((): Brand => brandStore.brands[0])
const BrandLogo = computed(() => useGetBrandLogo(BrandData.value.logo?.image) )

const appBarHandler = (): void => {
    if(smAndDown.value){
        isMenuOpen.value = !isMenuOpen.value
        return
    }
    rail.value = !rail.value
}

const setNavIcon = (icon: string, routeName: any): string => {
    if(
        (route.name?.toString().includes(String(routeName.name)) && String(routeName.name) != 'brand-center')
        || (route.name?.toString() == String(routeName.name) 
        && String(routeName.name) != 'brand-center') ){
        return icon.replace("-outline","")
    }else if(route.name?.toString() == 'brand-center' && String(routeName.name) == 'brand-center'){
        return icon.replace("-outline","")
    }
    return icon
}
if (!smAndDown.value){
    isMenuOpen.value = true
}
onBeforeMount(async() => brandStore.brands = await useGetOwnerBrands(userStore.user.owned_brands))
</script>

<template>
    <v-app>
        <v-app-bar>
            <v-container class="pl-0 pl-sm-2 pr-sm-8 d-flex align-center" fluid>
                <v-app-bar-nav-icon 
                    variant="text" 
                    @click.stop="appBarHandler()"
                />
                <div style="width: 30px;" class="ml-2 mr-4">
                    <NuxtLink :to="{name: 'index'}" class="w-100">
                        <v-img :src="`${config.public.CDN_MEDIA_URL}/assets/logo-icon.png`" />
                    </NuxtLink>
                </div>
                <v-app-bar-title>Brand Center</v-app-bar-title>
            </v-container>
        </v-app-bar>
        <v-divider class="app-divider"/>
        <v-navigation-drawer
            v-model="isMenuOpen"
            color="background"
            :location="smAndDown ? 'bottom': 'left'"
            expand-on-hover
            :rail="rail"
            :permanent="!smAndDown"
        >
            <v-list v-if="BrandData">
                <v-list-item
                    :prepend-avatar="BrandLogo"
                    :title="BrandData.name"
                ></v-list-item>
                <v-btn 
                    v-show="!rail"
                    class="ml-2"
                    color="primary-alt" 
                    variant="text"
                    rounded="lg"
                    size="small"
                    :to="{name: `brand-uid`, params: {uid: BrandData.uid}}"
                >
                    View Brand Page
                </v-btn>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item 
                    v-for="(nav, i) in navItems"
                    :prepend-icon="setNavIcon(String(nav.prependIcon), nav.to)" 
                    :title="nav.title" 
                    :value="nav"
                    :to="nav.to"
                    rounded="lg"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="main-adjust-content">
            <slot></slot>
        </v-main>
        <Snackbar />
    </v-app>
</template>

<style scoped>
.main-adjust-content {
    padding-top: 60px !important;
}

.app-divider {
    top: 64px;
    position: fixed;
    width: 100%;
    z-index: 1005;
}

</style>