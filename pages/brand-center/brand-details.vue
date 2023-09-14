<script setup lang="ts">
import { useBrandStore } from '@/store'
useBrandStore().middleware()
</script>

<template>
    <v-container class="px-sm-8" fluid>
        <h1>Brand details</h1>
        <v-row>
            <v-col
                v-for="n in 12"
                :key="n"
                cols="12"
                sm="6"
                md="3"
            >
                <v-card height="340">
                    {{ n }}
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>