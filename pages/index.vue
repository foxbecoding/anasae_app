<script setup lang="ts">

</script>

<template>
    <div>
        <NuxtLayout name="default">
            <CategoryBar />
            <v-container class="px-sm-8" fluid>
                <v-row>
                    <v-col
                        v-for="n in 12"
                        :key="n"
                        cols="12"
                        sm="6"
                        md="3"
                    >
                        <v-card height="340" elevation="1">
                            {{ n }}
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </NuxtLayout>
    </div>
    
</template>