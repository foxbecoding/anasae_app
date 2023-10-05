<script lang="ts" setup>
import { useSnackbarStore } from '@/store'

const props = defineProps(['product'])

const emit = defineEmits<{
  save: [status: boolean] 
}>()


const config = useRuntimeConfig()
const specifications = ref<any[]>(props.product.specifications)
const requiredSpecs = ref<any[]>( [...specifications.value.filter(x => x.is_required == true)])
const otherSpecs = ref<any[]>([...specifications.value.filter(x => x.is_required == false)])
const OtherSpecsFields = ref<any[]>([])

otherSpecs.value.forEach(x => {
    if (!x.is_required){
        OtherSpecsFields.value.push({
            label: x.label, 
            value: x.value, 
            is_required: x.is_required,
            pk: x.pk
        })
    }
})

const Variant = computed(() => `${props.product.color},${props.product.size}`)

const save = async (): Promise<void> => {
    var pks: any = []
    var values: any = []
    OtherSpecsFields.value.map((x: any) => {
        pks.push(x.pk)
        values.push({value: x.value})
    })
    pks = pks.toString()
    await useApi({
        method: 'PUT', 
        path: `${config.public.API_PRODUCT_SPECIFICATION}${pks}/`,
        data: values
    })
    emit('save', true) 
    useSnackbarStore().setSnackbar('Specifications updated', true)
}

</script>

<template>
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