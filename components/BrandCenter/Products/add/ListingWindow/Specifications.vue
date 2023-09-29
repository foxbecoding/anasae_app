<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'

const store = useBrandCenterProductListingStore()
const formRef = ref()
const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[a-zA-Z0-9/]+$/.test(char)) return true; 
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
                    <v-combobox
                        v-model="store.requiredProductSpecs.find(x => x.label == spec.item)[`${store.hasVariants ? 'variantValues' : 'value'}`]"
                        @keypress="filterValue"
                        :items="spec.options"
                        :label="`${spec.item}${store.hasVariants ? 's' : ''}`"
                        density="comfortable"
                        variant="solo"
                        :hint="`${store.hasVariants ? 'Press enter after each entry or choose an option' : ''}`"
                        :persistentHint="store.hasVariants"
                        color="primary"
                        bg-color="form-field-flat"
                        flat
                        :multiple="store.hasVariants"
                        :chips="store.hasVariants"
                        :rules="!store.hasVariants ? [(v: any) => !! v || `${spec.item} is required`] : []"
                        class="mb-1"
                    />
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