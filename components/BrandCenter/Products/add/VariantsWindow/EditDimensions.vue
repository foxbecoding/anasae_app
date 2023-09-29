<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
const props = defineProps({
    id: Number
})

const emit = defineEmits<{
  save: [status: boolean] 
}>()


interface DimRow {
    textModel: string 
    textLabel: string
    textKey: any
    selectModel: string
    selectItems: string[]
    selectKey: any
}

const store = useBrandCenterProductListingStore()
const productVariant = ref(store.productVariants.filter(x => x.id == props.id)[0])

const length = ref(productVariant.value.length)
const width = ref(productVariant.value.width)
const height = ref(productVariant.value.height)
const weight = ref(productVariant.value.weight)
const lengthUnit = ref(productVariant.value.lengthUnit)
const widthUnit = ref(productVariant.value.widthUnit)
const heightUnit = ref(productVariant.value.heightUnit)
const weightUnit = ref(productVariant.value.weightUnit)

const dimRows = ref<DimRow[]>([
    {
        textModel: length.value, 
        textLabel: 'Length', 
        textKey: 'length',
        selectModel: lengthUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'lengthUnit'
    },
    {
        textModel: width.value, 
        textLabel: 'Width', 
        textKey: 'width',
        selectModel: widthUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'widthUnit'
    },
    {
        textModel: height.value, 
        textLabel: 'Height', 
        textKey: 'height',
        selectModel: heightUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'heightUnit'
    },
    {
        textModel: weight.value, 
        textLabel: 'Weight', 
        textKey: 'weight',
        selectModel: weightUnit.value, 
        selectItems: ['oz', 'lbs'],
        selectKey: 'weightUnit'
    },
])
const form = ref()
const valid = ref<boolean>(true)
const Variant = computed(() => store.productVariants.filter(x => x.id == props.id)[0].variant)


const save = async(): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid){ return }
    dimRows.value.map(x => {
        store.productVariants.filter(x => x.id == props.id)[0][`${x.textKey}`] = x.textModel
        store.productVariants.filter(x => x.id == props.id)[0][`${x.selectKey}`] = x.selectModel
    })
    emit('save', true)
    useSnackbarStore().setSnackbar('Dimensions updated', true)
}

const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9.]+$/.test(char)) return true; 
    else e.preventDefault();
}

</script>

<template>
    <v-card-title class="pl-0 text-wrap">Edit Dimensions</v-card-title>
    <v-card-subtitle class="px-0 text-wrap">
        Enter the dimensions of the packaging that is used for your product(s).
    </v-card-subtitle>
    <v-card-subtitle class="px-0 text-wrap">
        Ensure that the measurements are as accurate as possible. 
        This is used to calculate shipping charges.
    </v-card-subtitle>
    <v-card-subtitle class="pl-0 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <v-form
        class="mt-4"
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row
            v-for="(row, i) in dimRows"
            :key="i" 
            no-gutters
        >
            <v-col 
                cols="8"
                sm="9"
                class="pr-1"
            >
                <v-text-field 
                    v-model="row.textModel"
                    @keypress="filterValue"
                    color="primary"
                    bg-color="form-field-flat"
                    :label="row.textLabel" 
                    variant="solo" 
                    flat 
                    :rules="[(v: any) => !! v || `${row.textLabel} is required`]"
                ></v-text-field>
            </v-col>
            <v-col 
                cols="4" 
                sm="3"
            >
                <v-select 
                    v-model="row.selectModel"
                    color="primary"
                    bg-color="form-field-flat"
                    label="Unit" 
                    variant="solo" 
                    flat 
                    :items="row.selectItems"
                ></v-select>
            </v-col>
        </v-row>
    </v-form>
    
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