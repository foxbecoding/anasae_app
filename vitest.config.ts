import { defineVitestConfig } from 'nuxt-vitest/config'
import AutoImport from "unplugin-auto-import/vite"
import { alias }  from './alias'

export default defineVitestConfig({
    plugins: [
        // vue(),
        AutoImport({
            imports: ['vue'],
            dirs: [
                './node_modules/vuetifylib/composables/**'
            ],
        }),
    ],
    
    resolve: { alias },

})