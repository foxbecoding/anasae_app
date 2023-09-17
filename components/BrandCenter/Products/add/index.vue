<script lang="ts" setup>
import { useBrandCenterProductStore } from '@/store'
import ListingWindow from './ListingWindow/index.vue'

const store = useBrandCenterProductStore()
const windowItems = shallowReactive([
    {id: 1, component: ListingWindow}
])

const WindowItem = computed(() => {
    let foundItem = windowItems.find(x => x.id == store.currentStep)
    if(foundItem){
        return foundItem.component
    }
    return {}
})

</script>

<template>
    <v-stepper 
        v-model="store.currentStep"
        :mobile="$vuetify.display.smAndDown"
        bg-color="background"
        color="primary-alt"
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
                        color="primary-alt"
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
                    <component :is="WindowItem"/>
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