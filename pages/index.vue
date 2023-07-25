<template>
    <v-container class="pa-0" fluid>
        <BannerSlider />
    </v-container>
    <v-container fluid>
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