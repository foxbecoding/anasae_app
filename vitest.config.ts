import { defineVitestConfig } from 'nuxt-vitest/config'
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from 'vitest/config'
// import vue from '@vitejs/plugin-vue'
import { alias }  from './alias'

// export default defineConfig({
//     plugins: [ 
//         vue(),
//         AutoImport({ imports: ['vue'] }),
//      ],
//     test: {
//         globals: true,
//         environment: 'happy-dom',
//         resolve: {alias}
//     }
// })

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
        environment: 'happy-dom',
        exclude: ['**/node_modules/**', '**/.nuxt/**']
    }

})