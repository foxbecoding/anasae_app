<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore, useSnackbarStore } from '@/store'

const props = defineProps(['fields', 'selectedVariants'])
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
const form = ref()
const formIsValid = ref<boolean>(true)
const fileRef = ref()
const quantityLimit = shallowRef([ ...Array(50).keys() ].map( i => i+1))
const listingDetails = reactive<any>({
    title: '',
    description: '',
    quantity: null,
    price: store.listingDetails.price,
    sku: null,
    images: [],
    specifications: [],
    length: '',
    width: '',
    height: '',
    weight: ''
})

const lengthUnit = ref<string>('in')
const widthUnit = ref<string>('in')
const heightUnit = ref<string>('in')
const weightUnit = ref<string>('oz')

const dimRows = ref<DimRow[]>([
    {
        textModel: listingDetails.length, 
        textLabel: 'Length', 
        textKey: 'length',
        selectModel: lengthUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'lengthUnit'
    },
    {
        textModel: listingDetails.width, 
        textLabel: 'Width', 
        textKey: 'width',
        selectModel: widthUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'widthUnit'
    },
    {
        textModel: listingDetails.height, 
        textLabel: 'Height', 
        textKey: 'height',
        selectModel: heightUnit.value, 
        selectItems: ['in', 'ft'],
        selectKey: 'heightUnit'
    },
    {
        textModel: listingDetails.weight, 
        textLabel: 'Weight', 
        textKey: 'weight',
        selectModel: weightUnit.value, 
        selectItems: ['oz', 'lbs'],
        selectKey: 'weightUnit'
    },
])


const Specs = computed(() => store.specifications.filter(x => x.is_required == false))

Specs.value.forEach(x => {
    if (!x.is_required){
        listingDetails.specifications.push({
            label: x.item, 
            value: `${x.item == 'Brand' ? useBrandStore().brands[0].name : ''}`, 
            is_required: x.is_required
        })
    }
})

const PreviewImages = computed(() => listingDetails.images.map((x: File) => (URL.createObjectURL(x))))

const setImages = (imageFiles: File[]): void => {
    imageFiles.map((x: File) => {
        listingDetails.images.push(x)
        listingDetails.images = listingDetails.images.splice(0, store.imgFilesMax)
    })
}
const removeImage = (i: number) => listingDetails.images = [...listingDetails.images.filter((x: File) => x != listingDetails.images[i])]
const isInFields = (field: string): boolean => props.fields.includes(field)


const save = async(): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid){ return }
    store.productVariants.filter(x => props.selectedVariants.includes(x))
    .map(x => {
        if(listingDetails.title && isInFields('title')){
            x.title = listingDetails.title
        }
        
        if(listingDetails.description 
        && isInFields('description')){
            x.description = listingDetails.description
        }

        if(listingDetails.price 
        && isInFields('price')){
            x.price = listingDetails.price > 500 ? listingDetails.price : store.listingDetails.price
        }
        
        if(listingDetails.quantity 
        && isInFields('quantity')){
            x.quantity = listingDetails.quantity
        }

        if(listingDetails.images.length > 0 
        && isInFields('images')){
            x.images = listingDetails.images 
        }
        
        x.previewImages = x.images.map(x => URL.createObjectURL(x))
        if(listingDetails.sku 
        && isInFields('sku')){
            x.sku = listingDetails.sku
        }
        let reqSpecs = x.specifications.filter(x => x.is_required)
        x.specifications = [...reqSpecs, ...listingDetails.specifications]
        if(isInFields('dimensions')){
            dimRows.value.map(dim => {
                x[`${dim.textKey}`] = dim.textModel
                x[`${dim.selectKey}`] = dim.selectModel
            })
        }
        return x
    })
    emit('save', true)
    useSnackbarStore().setSnackbar(`Variant${props.selectedVariants.length != 1 ? 's' : ''} updated`, true)
}

const numbersOnly = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9]+$/.test(char)) return true; 
    else e.preventDefault();
}

const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9.]+$/.test(char)) return true; 
    else e.preventDefault();
}

</script>

<template>
    <v-form
        ref="form"
        v-model="formIsValid"
        lazy-validation
    >
        <v-text-field
            v-if="isInFields('title')"
            bgColor='form-field-flat'
            color='primary'
            :counter="90"
            density='comfortable'
            errorMessages=''
            :flat="true"
            label='Title' 
            v-model="listingDetails.title" 
            name='title' 
            :rules="[ 
                (v: any) => !! v  || 'Title is required',
                (v: any) => v.length <= 90 || 'Must be 90 characters or less', 
            ]"
            type='text'
            variant='solo'
        />
        <v-textarea
            v-if="isInFields('description')"
            bgColor='form-field-flat'
            color='primary'
            :counter="300"
            density='comfortable'
            errorMessages=''
            :flat="true"
            label='Description' 
            v-model="listingDetails.description" 
            name='description' 
            :rules="[ 
                (v: any) => !! v  || 'Description is required', 
                (v: any) => v.length <= 300 || 'Must be 300 characters or less', 
            ]"
            type='text'
            variant='solo'
        />
        <v-text-field
            v-if="isInFields('price')"
            @keypress="numbersOnly($event)"
            class="mb-2"
            bgColor='form-field-flat'
            color='primary'
            :counter="90"
            hint='Exp: (1000 = $10.00) | (2999 = $29.99) | Minimum price $5.00'
            persistentHint
            density='comfortable'
            errorMessages=''
            :flat="true"
            label='Price' 
            v-model="listingDetails.price" 
            name='price' 
            :rules="[ 
                (v: any) => v && v >= 500 || 'Minimum price is $5.00' 
            ]"
            type='text'
            variant='solo'
        />
        <v-select
            v-if="isInFields('quantity')"
            bgColor='form-field-flat'
            :flat="true" 
            color="primary"
            density='comfortable'
            :items="quantityLimit"
            label="Quantity"
            v-model="listingDetails.quantity"
            name='quantity'
            :returnObject="true"
            variant='solo'
        />
        <v-text-field
            v-if="isInFields('sku')"
            bgColor='form-field-flat'
            color='primary'
            density='comfortable'
            errorMessages=''
            :flat="true"
            label='Sku' 
            v-model="listingDetails.sku" 
            name='sku' 
            type='text'
            variant='solo'
        />
        <div v-if="isInFields('dimensions')">
            <v-card-title class="px-0">Dimensions</v-card-title>
            <v-card-subtitle class="px-0 text-wrap">
                Enter the dimensions of the packaging that is used for your product(s).
            </v-card-subtitle>
            <v-card-subtitle class="px-0 text-wrap">
                Ensure that the measurements are as accurate as possible. 
                This is used to calculate shipping charges.
            </v-card-subtitle>
            <v-container class="px-0" >
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
            </v-container>
        </div>
        <v-row v-if="isInFields('specifications')" class="mt-4">
            <v-container class="pa-0" fluid><v-card-title>Specifications</v-card-title></v-container>
            <v-col 
                v-for="(spec, i) in listingDetails.specifications" :key="i"
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
    </v-form>
    <div v-if="isInFields('images')">
        <v-card-title class="px-0">Images</v-card-title>
        <v-card-subtitle class="px-0">You can upload up to {{ store.imgFilesMax }} images</v-card-subtitle>
        <v-card-subtitle class="px-0">Recommened image size: 1200 x 1200</v-card-subtitle>
        <v-file-input
            @update:model-value="setImages"
            class="d-none" 
            ref="fileRef" 
            accept="image/png, image/jpeg, image/avif"
            multiple
        />
        <div class="d-flex images-container ">
            <v-btn 
                @click="listingDetails.images.length < store.imgFilesMax ? fileRef.click() : false"
                color="surface-el" 
                flat 
                height="90"
                width="90"
                rounded="lg"
                :disabled="listingDetails.images.length >= store.imgFilesMax"
            >
                {{ listingDetails.images.length > 0 ? listingDetails.images.length :  '' }}
                <v-icon size="36">mdi-plus</v-icon>
            </v-btn>
            <div class="d-flex flex-wrap">
                <div
                    v-for="(imgSrc, i) in PreviewImages"
                    :key="i" 
                    class="ml-2 mb-2 image-wrapper bg-surface-el rounded-lg"
                >
                    <v-img :src="imgSrc" style="position: relative">
                        <v-btn 
                            @click="removeImage(i)"
                            color="error" 
                            variant="text" 
                            size="x-small" 
                            icon 
                            flat
                        >
                            <v-icon size="large">mdi-delete</v-icon>
                        </v-btn>
                    </v-img>
                </div>
            </div>
        </div>
    </div>
    <v-btn 
        @click="save()"
        class="mt-4"
        color="primary" 
        rounded="pill" 
        flat 
        block
        :disabled="!formIsValid"
    >
        Save
    </v-btn> 
</template>

<style scoped>
.image-wrapper {
    width: 90px;
    height: 90px;
    position: relative;
}
</style>