<script lang="ts" setup>
import { useUserStore, useUserMenuStore, useSnackbarStore } from '@/store'

const config = useRuntimeConfig()
const userStore = useUserStore()
const userMenuStore = useUserMenuStore()

</script>

<template>
    <v-list class="py-0" density="compact">
        <v-list-item class="pl-1" title="Payment method details">
            <template v-slot:prepend>
                <v-btn 
                    @click="userMenuStore.selectedView = userMenuStore.walletPreviousView"
                    icon="mdi-arrow-left"
                    variant="plain"
                    size="small"
                >
                </v-btn>
            </template>
        </v-list-item>
    </v-list>
    <v-divider />
    <v-card>
        {{ userMenuStore.walletSelectedPaymentMethod }}
    </v-card>

</template>

<style scoped>
.no-addresses-container {
    max-width: 200px;
}
</style>