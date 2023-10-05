<script lang="ts" setup>
import { useSnackbarStore } from '@/store'

const props = defineProps(['product'])

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

const config = useRuntimeConfig()
const form = ref()
const valid = ref<boolean>(true)
const dimension = props.product.dimension

const Variant = computed(() => `${props.product.color},${props.product.size}`)

const setValue = (_value: string) => {
    var value: string = ''
    const units = ['in','ft','oz','lbs']
    units.forEach(x => {
        if (_value.includes(x)){
            value = _value.split(x)[0]
        }       
    })
    return value
}

const setUnit = (_value: string) => {
    var unit: string = ''
    const units = ['in','ft','oz','lbs']
    units.forEach(x => {
        if (_value.includes(x)){
            unit = x
        }       
    })
    return unit
}

const dimRows = ref<DimRow[]>([
    {
        textModel: setValue(dimension.length), 
        textLabel: 'Length', 
        textKey: 'length',
        selectModel: setUnit(dimension.length), 
        selectItems: ['in', 'ft'],
        selectKey: 'lengthUnit'
    },
    {
        textModel: setValue(dimension.width), 
        textLabel: 'Width', 
        textKey: 'width',
        selectModel: setUnit(dimension.width), 
        selectItems: ['in', 'ft'],
        selectKey: 'widthUnit'
    },
    {
        textModel: setValue(dimension.height), 
        textLabel: 'Height', 
        textKey: 'height',
        selectModel: setUnit(dimension.height), 
        selectItems: ['in', 'ft'],
        selectKey: 'heightUnit'
    },
    {
        textModel: setValue(dimension.weight), 
        textLabel: 'Weight', 
        textKey: 'weight',
        selectModel: setUnit(dimension.weight), 
        selectItems: ['oz', 'lbs'],
        selectKey: 'weightUnit'
    },
])

const save = async(): Promise<void> => {
    var data: any = {}
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid){ return }
    dimRows.value.map(x => {
        data[`${x.textKey}`] = x.textModel+x.selectModel
    })
    await useApi({
        method: 'PUT', 
        path: `${config.public.API_PRODUCT_DIMENSION}${dimension.pk}/`,
        data: data
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