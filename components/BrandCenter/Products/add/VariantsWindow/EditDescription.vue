<script lang="ts" setup>
import { useBrandCenterProductListingStore, useSnackbarStore } from '@/store'
const props = defineProps({
    id: Number
})

const emit = defineEmits<{
  save: [status: boolean] 
}>()


const store = useBrandCenterProductListingStore()
const description = ref<string>(store.productVariants.filter(x => x.id == props.id)[0].description)

const Variant = computed(() => store.productVariants.filter(x => x.id == props.id)[0].variant)


const save = (): void => {
    store.productVariants.filter(x => x.id == props.id)[0].description = description.value
    emit('save', true)
    useSnackbarStore().setSnackbar('Description updated', true)
}

</script>

<template>
    <v-card-title class="pl-0 text-wrap">Edit Description</v-card-title>
    <v-card-subtitle class="pl-0 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <v-textarea  
        v-model="description" 
        label="Description" 
        type="text"
        :rules="[ 
            (v: any) => !! v || 'Description is required',
            (v: any) => v.length <= 300 || 'Must be 300 characters or less', 
        ]"
        :counter="300"
        error-messages=""
        variant="solo"
        color="primary"
        bg-color="form-field-flat"
        flat
    />
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