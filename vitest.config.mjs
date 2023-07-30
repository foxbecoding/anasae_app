import { defineVitestConfig } from 'nuxt-vitest/config'
import AutoImport from "unplugin-auto-import/vite"
import { alias }  from './alias'

export default defineVitestConfig({
    plugins: [
        AutoImport({
            imports: ['vue'],
            dirs: [
                './node_modules/vuetify/lib/composables/'
            ],
        }),
    ],
    test: {
        resolve: { alias },
        globals: true,
        environment: 'happy-dom',
        exclude: ['**/node_modules/**', '**/.nuxt/**']
    }

})