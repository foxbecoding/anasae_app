<script lang="ts" setup>
import { useBrandCenterProductStore, useCategoryStore } from '@/store'
import { FormTextField, FormSelectField } from '@/utils/types'

// const config = useRuntimeConfig()
const store = useBrandCenterProductStore()
const formRef = ref()
const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[a-zA-z0-9,/]+$/.test(char)) return true; 
    else e.preventDefault();
}

const RequiredSpecs = computed(() => store.specifications.filter(x => x.is_required == true))
const OtherSpecs = computed(() => store.specifications.filter(x => x.is_required == false))

</script>

<template>
    <v-card v-show="store.specifications.length > 0" color="background" max-width="500">
        <v-card-title class="px-0">Specifications</v-card-title>
        <v-card-text class="px-0">
            <v-switch
                v-model="store.hasVariants"
                hide-details
                inset
                color="primary-alt"
                :label="`Product has variants: ${store.hasVariants ? 'Yes' : 'No'}`"
            ></v-switch>
            <v-form ref="formRef">
                <div v-for="(spec, i) in RequiredSpecs" :key="i">
                    <v-text-field 
                        v-model="store.requiredProductSpecs.find(x => x.label == spec.item).value"
                        @keypress="store.hasVariants ? filterValue($event) : false"
                        :label="`${spec.item}${store.hasVariants ? 's' : ''}`"
                        density="comfortable"
                        variant="solo"
                        :hint="`${store.hasVariants ? 'Separate each entry with a comma' : ''}`"
                        :persistentHint="store.hasVariants"
                        color="primary"
                        bg-color="form-field-flat"
                        flat
                        :rules="[(v: any) => !! v || `${spec.item} is required`]"
                        class="mb-1"
                    >
                    </v-text-field>
                </div>      
                
                <v-row class="mt-4">
                    <v-container class="py-0" fluid><h3>Other specifications</h3></v-container>
                    <v-col 
                        v-for="(spec, i) in OtherSpecs" :key="i"
                        cols="12"
                        sm="6" 
                    >
                        <v-text-field  
                            v-model="store.otherProductSpecs.find(x => x.label == spec.item).value"
                            :label="`${spec.item}`"
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
        </v-card-text>
    </v-card>
</template>