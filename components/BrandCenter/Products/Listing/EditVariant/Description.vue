<script lang="ts" setup>
import { useSnackbarStore } from '@/store'

const props = defineProps(['product'])
const emit = defineEmits<{
  save: [status: boolean] 
}>()

const config = useRuntimeConfig()
const description = ref(props.product.description)
const form = ref()
const isSaving = ref<boolean>(false)
const valid = ref<boolean>(true)
const Variant = computed(() => `${props.product.color},${props.product.size}`)

const save = async(): Promise<void> => {
    isSaving.value = true
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid){ isSaving.value = false; return; }
    await useApi({
        method: 'PATCH', 
        path: `${config.public.API_PRODUCT}${props.product.pk}/`,
        data: {description: description.value}
    })
    emit('save', true)
    useSnackbarStore().setSnackbar('Description updated', true)
    isSaving.value = false
}

</script>

<template>
    <v-card-title class="pl-0 text-wrap">Edit Description</v-card-title>
    <v-card-subtitle class="pl-0 mb-4 text-wrap">
        Variant: {{ Variant }}
    </v-card-subtitle>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
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
    </v-form>
    <v-btn 
        @click="save" 
        class="mt-4"
        color="primary" 
        rounded="pill"
        :loading="isSaving"
        block 
        flat 
    >
        Save
    </v-btn>
</template>