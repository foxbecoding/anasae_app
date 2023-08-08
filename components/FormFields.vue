<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <div 
            v-for="(field, i ) in props.fields" 
            :key="field.id"
        >
            <v-text-field 
                v-if="field.inputType === 'TEXTFIELD'" 
                @keypress.enter="submit()"
                v-model="field.model" 
                :label="field.label" 
                :type="field.type"
                :rules="field.rules"
                :counter="field.counter"
                :density="field.density"
                :disabled="field.disabled"
                :prepend-inner-icon="field.prependInnerIcon"
                :variant="field.variant"
                :color="field.color"
            />
            <v-textarea 
                v-if="field.inputType === 'TEXTAREA'" 
                @keypress.enter="submit()"
                v-model="field.model" 
                :label="field.label" 
                :type="field.type"
                :rules="field.rules"
                :counter="field.counter"
                :density="field.density"
                :disabled="field.disabled"
                :prepend-inner-icon="field.prependInnerIcon"
                :color="field.color"
            />
            <v-select
                v-if="field.inputType === 'SELECT'" 
                v-model="field.model"
                :label="field.label"
                :items="field.items"
                :item-title="field.itemTitle"
                :item-value="field.itemValue"
                :density="field.density"
                :color="field.color"
                return-object
            />
            <v-switch
                v-if="field.inputType === 'SWITCH'" 
                v-model="field.model"
                :label="field.label"
                :color="field.color"
                hide-details
                inset
            />
        </div>
        <v-btn
            v-if="props.isSubmitBtn"
            @click="submit()"
            :disabled="isLoading"
            :loading="isLoading"
            class="text-background" 
            color="primary"
            rounded="xl" 
            block 
            flat
        >
            Submit
        </v-btn>
    </v-form>
</template>

<script lang="ts" setup>
import { ApiData, ApiMethod } from '@/utils/types'
import { PropType } from 'vue'
import { FormField } from '@/utils/types'

const props = defineProps({
    fields: {
        type: Array as PropType<FormField[]>,
        required: true
    },
    apiPath: {
        type: String,
        required: false
    },
    apiMethod: String as PropType<ApiMethod>,
    isSubmitBtn: Boolean
})

const emit = defineEmits(['submit'])

const form = ref()
const valid = ref<boolean>(true)
const isLoading = ref<boolean>(false)

const submit = async (): Promise<void> => {
    isLoading.value = true
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }

    let formData: any = {}

    props.fields.forEach(field => { formData[`${field.name}`] = field.model })

    let apiData: ApiData = {
        path: `${props.apiPath}`,
        method: `${props.apiMethod}` as ApiMethod,
        data: formData
    }
    
    const { data, pending, error, refresh, status } = await useApi(apiData)
    // emit('submit', { data: data.value, error: error.value })
    isLoading.value = false
}

const allow_only_letters_numbers_commas = (e: any) => {
    //Limit username field to only accept 'letters', 'numbers', and 'underscores'
    let char = String.fromCharCode(e.keyCode);
    if(/^[A-Za-z0-9]+$/.test(char)) return true; 
    else e.preventDefault();
}

</script>