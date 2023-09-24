<script lang="ts" setup>
import {useBrandStore, useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
const props = defineProps({
    id: Number
})

const emit = defineEmits<{
  save: [status: boolean] 
}>()


const store = useBrandCenterProductListingStore()
const specifications = ref<any[]>([...store.productVariants.filter(x => x.id == props.id)[0].specifications])
const requiredSpecs = ref<any[]>( [...specifications.value.filter(x => x.is_required == true)])
const otherSpecs = ref<any[]>([...specifications.value.filter(x => x.is_required == false)])
const OtherSpecsFields = ref<any[]>([])

otherSpecs.value.forEach(x => {
    if (!x.is_required){
        OtherSpecsFields.value.push({
            label: x.label, 
            value: x.value, 
            is_required: x.is_required
        })
    }
})

const Variant = computed(() => store.productVariants.filter(x => x.id == props.id)[0].variant)
const save = (): void => {
    store.productVariants.filter(x => x.id == props.id)[0].specifications = [...requiredSpecs.value, ...OtherSpecsFields.value]
    emit('save', true) 
    useSnackbarStore().setSnackbar('Specifications updated', true)
}

</script>

<template>
    {{ specifications }}
    <v-card-title class="pl-0 text-wrap">Edit Specifications</v-card-title>
    <v-card-subtitle class="pl-0 mb-4 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <div v-for="(spec, i) in requiredSpecs" :key="i">
        <v-text-field 
            v-model="spec.value"
            :label="`${spec.label}`"
            density="comfortable"
            variant="solo"
            hide-details
            readonly
            disabled
            color="primary"
            bg-color="form-field-flat"
            flat
            class="mb-2"
        >
        </v-text-field>
    </div> 

    <v-row class="mt-4">
        <v-col 
            v-for="(spec, i) in OtherSpecsFields" :key="i"
            cols="12"
            sm="6"
        >
            <v-text-field  
                v-model="spec.value"
                :label="`${spec.label}`"
                density="comfortable"
                variant="solo"
                color="primary"
                bg-color="form-field-flat"
                flat
            >
            </v-text-field>
        </v-col>
    </v-row>

    <v-btn 
        @click="save" 
        class="mt-4"
        color="primary" 
        rounded="pill"
        block 
        flat 
    >
        Save
    </v-btn>
</template>