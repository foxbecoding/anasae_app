<script lang="ts" setup>
import { ApiData, ApiMethod } from '@/utils/types'
import { PropType } from 'vue'
import { FormTextField, FormSelectField, FormButton, FormCustomText, FormSwitchField } from '@/utils/types'

const props = defineProps({
    fields: {
        type: Array as PropType<
            FormTextField[] 
            & FormSelectField[] 
            & FormCustomText[] 
            & FormSwitchField[]
        >,
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

const emit = defineEmits(['submit', 'updated'])

const form = ref()
const valid = ref<boolean>(true)
const isLoading = ref<boolean>(false)

watch(props.fields, (a, b) => {
    props.fields.map(x => props.store[`${x.name}`] = x.model)
    emit('updated', props.fields)
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

function numbersOnly(e: any){
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
                @keypress="field.isNumbersOnly ? numbersOnly($event) : false"
                v-model="field.model" 
                :label="field.label" 
                :type="field.type"
                :rules="field.rules"
                :counter="field.counter"
                :density="field.density"
                :disabled="field.disabled"
                :hint="field.hint"
                :persistent-hint="field.persistentHint"
                :error-messages="field.errorMessages"
                :prepend-inner-icon="field.prependInnerIcon"
                :variant="field.variant"
                :color="field.color"
                :bg-color="field.bgColor"
                :flat="field.flat"
                class="mb-1"
            >
                <template 
                    v-if="field.appendInnerIcon && field.appendInnerIconFunction" 
                    v-slot:append-inner
                >
                    <v-icon 
                        @click="field.appendInnerIconFunction()"
                        :color="field.appendInnerIconColor"
                        :icon="field.appendInnerIcon"
                    />
                </template>
            </v-text-field>
            <v-textarea 
                v-if="field.inputType === 'TEXTAREA'" 
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
                :bg-color="field.bgColor"
                :flat="field.flat"
                class="mb-1"
            />
            <v-select
                v-if="field.inputType === 'SELECT'" 
                v-model="field.model"
                :label="field.label"
                :items="field.items"
                :item-title="field.title"
                :item-value="field.value"
                :density="field.density"
                :color="field.color"
                :variant="field.variant"
                :rules="field.rules"
                :return-object="field.returnObject"
                :bg-color="field.bgColor"
                :flat="field.flat"
                class="mb-1"
            />
            <v-switch
                v-if="field.inputType === 'SWITCH'" 
                v-model="field.model"
                :label="field.label"
                :color="field.color"
                :hide-details="field.hideDetails"
                :inset="field.inset"
                class="mb-1"
            />
            <p
                v-if="field.inputType === 'FORMTEXT'"
                :class="field.class"
            >
                {{ field.text }}
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