import { defineVitestConfig } from 'nuxt-vitest/config'
import AutoImport from "unplugin-auto-import/vite"
import { alias }  from './alias'

export default defineVitestConfig({
    plugins: [
        AutoImport({
            imports: ['vue'],
            dirs: [
                './node_modules/vuetifylib/composables/**'
            ],
        }),
    ],
    test: {
        resolve: { alias },
        globals: true,
        environment: 'nuxt'
    }

})