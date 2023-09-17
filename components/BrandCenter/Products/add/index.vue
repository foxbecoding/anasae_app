<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'

const store = useBrandCenterProductStore()

</script>

<template>
    <v-stepper 
        v-model="store.currentStep"
        bg-color="background"
        :flat="true"
    >
        <template v-slot:default="{ prev, next }">
            <v-stepper-header>
                <template v-for="step in store.steps" :key="`${step.id}-step`">
                    <v-stepper-item
                        :complete="store.currentStep > step.id"
                        :step="`Step ${ step.id }`"
                        :value="step.id"
                        :title="step.title"
                    ></v-stepper-item>

                    <v-divider
                        v-if="step.id !== store.steps.length"
                        :key="step.id"
                    ></v-divider>
                </template>
            </v-stepper-header>

            <v-stepper-window>
                <v-stepper-window-item
                    v-for="step in store.steps"
                    :key="`${step.id}-content`"
                    :value="step.id"
                >
                    <v-card
                        color="background"
                        height="200"
                    ></v-card>
                </v-stepper-window-item>
            </v-stepper-window>

            <v-stepper-actions
                :disable="false"
                @click:prev="prev"
                @click:next="next"
            ></v-stepper-actions>
        </template>
    </v-stepper>
</template>

<style scoped>
.v-stepper.v-sheet {
    box-shadow: none !important;
}

.v-stepper-header {
    box-shadow: none !important;
}
</style>