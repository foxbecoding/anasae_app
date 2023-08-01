import { defineVitestConfig } from 'nuxt-vitest/config'
import AutoImport from "unplugin-auto-import/vite"
import { alias }  from './alias'
import vuetify from 'vite-plugin-vuetify'

export default defineVitestConfig({
    plugins: [
        vuetify(),
        AutoImport({
            imports: ['vue'],
            dirs: [
                './composables/'
            ],
        }),
    ],
    test: {
        resolve: { alias },
        globals: true,
        environment: 'nuxt',
        // exclude: ['**/node_modules/**', '**/.nuxt/**'],
        deps: { inline: ["vuetify"] },
        coverage: {
            exclude: ['./.nuxt', './node_modules']
        }
    }
})