<script lang="ts" setup>
import { useBrandStore, useBrandCenterProductListingStore, useSnackbarStore } from '@/store'

const props = defineProps(['fields', 'selectedVariants'])
const emit = defineEmits<{
    save: [status: boolean] 
}>()

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
    specifications: []
})

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
        x.title = listingDetails.title && isInFields('title') ? listingDetails.title: store.listingDetails.title
        x.description = listingDetails.description && isInFields('description') ? listingDetails.description : store.listingDetails.description
        x.price = listingDetails.price && isInFields('price') ? listingDetails.price : store.listingDetails.price
        x.quantity = listingDetails.quantity && isInFields('quantity') ? listingDetails.quantity : store.listingDetails.quantity
        x.images = listingDetails.images.length > 0 && isInFields('images') ? listingDetails.images : store.listingDetails.images
        x.sku = listingDetails.sku && isInFields('sku') ?  listingDetails.sku : null
        let reqSpecs = x.specifications.filter(x => x.is_required)
        x.specifications = [...reqSpecs, ...listingDetails.specifications]
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
        <v-card-subtitle class="px-0">Recommened image size: 600 x 600</v-card-subtitle>
        <v-file-input
            @update:model-value="setImages"
            class="d-none" 
            ref="fileRef" 
            accept="image/png, image/jpeg"
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