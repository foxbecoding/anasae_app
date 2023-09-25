<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from '@/store'

const props = defineProps(['fields', 'selectedVariants'])
const emit = defineEmits<{
    save: [status: boolean] 
}>()

const store = useBrandCenterProductListingStore()
const form = ref()
const valid = ref<boolean>(true)
const quantityLimit = shallowRef([ ...Array(50).keys() ].map( i => i+1))
const listingDetails = reactive<any>({
    title: '',
    description: '',
    quantity: null,
    price: store.listingDetails.price,
    sku: null,
    images: []
})

const save = async(): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid){ return }
    store.productVariants.filter(x => props.selectedVariants.includes(x))
    .map(x => {
        x.title = listingDetails.title ? listingDetails.title: store.listingDetails.title
        x.description = listingDetails.description ? listingDetails.description : store.listingDetails.description
        x.price = listingDetails.price ? listingDetails.price : store.listingDetails.price
        x.quantity = listingDetails.quantity ? listingDetails.quantity : store.listingDetails.quantity
        x.sku = listingDetails.sku ? listingDetails.sku : store.listingDetails.sku
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
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-if="props.fields.includes('title')"
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
            v-if="props.fields.includes('description')"
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
            v-if="props.fields.includes('price')"
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
            v-if="props.fields.includes('quantity')"
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
            v-if="props.fields.includes('sku')"
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
    </v-form>
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