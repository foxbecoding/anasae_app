<script lang="ts" setup>
import { Brand } from '@/utils/types'
import { PropType } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
    brand: {} as PropType<Brand>,
    maxBioHeight: Number
})

const emit = defineEmits<{
  (e: 'openMobileBio', value: boolean): void
}>()

const bio = ref()
const isBioBlur = ref<boolean>(false)

onMounted(() => {
    if(bio.value.$el.offsetHeight >= 76){
        isBioBlur.value = true
    }
})


watch(useDisplay().xs, (newValue) => {
    if(newValue){
        isBioBlur.value = bio.value.$el.offsetHeight >= 76 ? true : false
    }
})

</script>

<template>
    <v-card 
        max-width="500" 
        :max-height="props.maxBioHeight" 
        color="background" 
        class="mx-auto mx-sm-0 overflow-y-hidden"
        :class="isBioBlur ? 'mb-2' : 'mb-0'"
        style="position: relative"
    >
        <v-card-title class="text-center text-sm-left text-h6">
            {{ props.brand?.name }}
        </v-card-title>
        <v-card-text ref="bio" class="text-left">
            {{ props.brand?.bio }}
        </v-card-text>
        <div 
            v-if="isBioBlur"
            @click="emit('openMobileBio', true)"
            style="position: absolute; bottom: 0; height: 20px;" 
            class="details-overflow w-100 d-sm-none"
        >
            <v-icon icon="mdi-chevron-down" size="15"></v-icon>
        </div>
    </v-card>
</template>

<style scoped>
.details-overflow {
    background: rgba(var(--v-theme-background), 0.4) !important;
    -webkit-backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);      
}
</style>