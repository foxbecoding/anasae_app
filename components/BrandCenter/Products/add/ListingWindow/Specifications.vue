<script lang="ts" setup>
import { useBrandCenterProductListingStore } from '@/store'
import { CategoryProductSpecificationItem } from '@/utils/types'

// const config = useRuntimeConfig()
const store = useBrandCenterProductListingStore()
const formRef = ref()
const filterValue = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[a-zA-z0-9/]+$/.test(char)) return true; 
    else e.preventDefault();
}

const RequiredSpecs = computed(() => store.specifications.filter(x => x.is_required == true))
const OtherSpecs = computed(() => store.specifications.filter(x => x.is_required == false))

const addVariant = (spec: CategoryProductSpecificationItem): void => {
    let value = store.requiredProductSpecs.find(x => x.label == spec.item).value
    if(!value){return}
    store.variantChips.push({label: spec.item, value: value.toUpperCase(), is_required: spec.is_required})
    store.requiredProductSpecs.find(x => x.label == spec.item).value = ''
}

const removeVariant = (i: any) => store.variantChips.splice(i, 1)

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
                    <v-chip-group v-if="store.hasVariants && store.variantChips.length > 0">
                        <v-chip 
                            v-for="(chip, n) in store.variantChips"
                            :key="n"
                            v-show="chip.label == spec.item"
                            @click.stop:close="removeVariant(n)"
                        >
                            {{ chip.value }}
                            <v-icon class="pl-4" size="small" icon="mdi-close-circle"></v-icon>
                        </v-chip>
                    </v-chip-group>
                    <v-text-field 
                        v-model="store.requiredProductSpecs.find(x => x.label == spec.item).value"
                        @keypress.enter="store.hasVariants ? addVariant(spec) : false"
                        @keypress="filterValue"
                        :label="`${spec.item}${store.hasVariants ? 's' : ''}`"
                        density="comfortable"
                        variant="solo"
                        :hint="`${store.hasVariants ? 'Press enter after each entry' : ''}`"
                        :persistentHint="store.hasVariants"
                        color="primary"
                        bg-color="form-field-flat"
                        flat
                        :rules="!store.hasVariants ? [(v: any) => !! v || `${spec.item} is required`] : []"
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