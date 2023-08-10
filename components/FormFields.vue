<script lang="ts" setup>
import { ApiData, ApiMethod } from '@/utils/types'
import { PropType } from 'vue'
import { FormField, FormButton } from '@/utils/types'

const props = defineProps({
    fields: {
        type: Array as PropType<FormField[]>,
        required: true
    },
    formClass: String,
    formButton: {
        type: Object as PropType<FormButton>,
        required: false
    },
    apiPath: {
        type: String,
        required: false
    },
    store: {
        type: Object,
        default: {},
        required: false
    },
    apiMethod: String as PropType<ApiMethod>
})

const emit = defineEmits(['submit'])

const form = ref()
const valid = ref<boolean>(true)
const isLoading = ref<boolean>(false)

watch(props.fields, (a, b) => {
    props.fields.map(x => props.store[`${x.name}`] = x.model)
})

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
    emit('submit', { data: data.value, status:status.value, error: error.value })
    isLoading.value = false
}

const allow_only_letters_numbers_commas = (e: any) => {
    //Limit username field to only accept 'letters', 'numbers', and 'underscores'
    let char = String.fromCharCode(e.keyCode);
    if(/^[A-Za-z0-9]+$/.test(char)) return true; 
    else e.preventDefault();
}

</script>

<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        :class="props.formClass"
    >
        <div 
            v-for="(field, i ) in props.fields" 
            :key="field.id"
            :class="field.class"
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
                :error-messages="field.errorMessages"
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
                :error-messages="field.errorMessages"
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
            <p
                v-if="field.inputType === 'FORMTEXT'"
                :class="field.class"
            >
                {{ field.formText }}
            </p>
        </div>
    </v-form>
    <v-btn
        v-if="props.formButton?.show || false"
        @click="submit()"
        :disabled="isLoading"
        :loading="isLoading"
        :class="props.formButton?.class" 
        :color="props.formButton?.color"
        :rounded="props.formButton?.rounded" 
        :block="props.formButton?.block" 
        :flat="props.formButton?.flat"
    >
        {{ props.formButton?.label }}
    </v-btn>
</template>