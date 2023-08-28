<script lang="ts" setup></script>

<template>
    <v-container class="px-sm-8" fluid>
        <BrandContent />
    </v-container>
    <v-container class="px-sm-8" fluid>
        <v-divider />
        <v-row class="pt-4">
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