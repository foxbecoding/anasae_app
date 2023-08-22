// vitest.config.mjs
import { defineVitestConfig } from "file:///C:/Users/desmo/OneDrive/Desktop/code/projects/anasae/frontend_app/node_modules/nuxt-vitest/dist/config.mjs";
import AutoImport from "file:///C:/Users/desmo/OneDrive/Desktop/code/projects/anasae/frontend_app/node_modules/unplugin-auto-import/dist/vite.js";

// alias.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\desmo\\OneDrive\\Desktop\\code\\projects\\anasae\\frontend_app";
var r = (p) => resolve(__vite_injected_original_dirname, p);
var alias = {
  "~~": r("."),
  "~~/": r("./"),
  "@@": r("."),
  "@@/": r("./")
};

// vitest.config.mjs
import vuetify from "file:///C:/Users/desmo/OneDrive/Desktop/code/projects/anasae/frontend_app/node_modules/vite-plugin-vuetify/dist/index.js";
var vitest_config_default = defineVitestConfig({
  plugins: [
    vuetify(),
    AutoImport({
      imports: ["vue"],
      dirs: [
        "./composables/"
      ]
    })
  ],
  test: {
    resolve: { alias },
    globals: true,
    environment: "nuxt",
    deps: { inline: ["vuetify"] },
    coverage: {
      exclude: ["**/node_modules/**", "**/.nuxt/**"]
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tanMiLCAiYWxpYXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZXNtb1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGNvZGVcXFxccHJvamVjdHNcXFxcYW5hc2FlXFxcXGZyb250ZW5kX2FwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGVzbW9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb2RlXFxcXHByb2plY3RzXFxcXGFuYXNhZVxcXFxmcm9udGVuZF9hcHBcXFxcdml0ZXN0LmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Rlc21vL09uZURyaXZlL0Rlc2t0b3AvY29kZS9wcm9qZWN0cy9hbmFzYWUvZnJvbnRlbmRfYXBwL3ZpdGVzdC5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lVml0ZXN0Q29uZmlnIH0gZnJvbSAnbnV4dC12aXRlc3QvY29uZmlnJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiXHJcbmltcG9ydCB7IGFsaWFzIH0gIGZyb20gJy4vYWxpYXMnXHJcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVWaXRlc3RDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZXRpZnkoKSxcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnXSxcclxuICAgICAgICAgICAgZGlyczogW1xyXG4gICAgICAgICAgICAgICAgJy4vY29tcG9zYWJsZXMvJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHRlc3Q6IHtcclxuICAgICAgICByZXNvbHZlOiB7IGFsaWFzIH0sXHJcbiAgICAgICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgICAgICBlbnZpcm9ubWVudDogJ251eHQnLFxyXG4gICAgICAgIGRlcHM6IHsgaW5saW5lOiBbXCJ2dWV0aWZ5XCJdIH0sXHJcbiAgICAgICAgY292ZXJhZ2U6IHtcclxuICAgICAgICAgICAgZXhjbHVkZTogWycqKi9ub2RlX21vZHVsZXMvKionLCAnKiovLm51eHQvKionXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGRlc21vXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcY29kZVxcXFxwcm9qZWN0c1xcXFxhbmFzYWVcXFxcZnJvbnRlbmRfYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZXNtb1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGNvZGVcXFxccHJvamVjdHNcXFxcYW5hc2FlXFxcXGZyb250ZW5kX2FwcFxcXFxhbGlhcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZGVzbW8vT25lRHJpdmUvRGVza3RvcC9jb2RlL3Byb2plY3RzL2FuYXNhZS9mcm9udGVuZF9hcHAvYWxpYXMudHNcIjsvLyBmaWxlIGFsaWFzLnRzXHJcblxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuXHJcbmNvbnN0IHIgPSAocDogc3RyaW5nKSA9PiByZXNvbHZlKF9fZGlybmFtZSwgcClcclxuXHJcbmV4cG9ydCBjb25zdCBhbGlhczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAnfn4nOiByKCcuJyksXHJcbiAgJ35+Lyc6IHIoJy4vJyksXHJcbiAgJ0BAJzogcignLicpLFxyXG4gICdAQC8nOiByKCcuLycpLFxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLDBCQUEwQjtBQUNoYixPQUFPLGdCQUFnQjs7O0FDQ3ZCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLElBQUksQ0FBQyxNQUFjLFFBQVEsa0NBQVcsQ0FBQztBQUV0QyxJQUFNLFFBQWdDO0FBQUEsRUFDM0MsTUFBTSxFQUFFLEdBQUc7QUFBQSxFQUNYLE9BQU8sRUFBRSxJQUFJO0FBQUEsRUFDYixNQUFNLEVBQUUsR0FBRztBQUFBLEVBQ1gsT0FBTyxFQUFFLElBQUk7QUFDZjs7O0FEUkEsT0FBTyxhQUFhO0FBRXBCLElBQU8sd0JBQVEsbUJBQW1CO0FBQUEsRUFDOUIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLE1BQ1AsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNmLE1BQU07QUFBQSxRQUNGO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNGLFNBQVMsRUFBRSxNQUFNO0FBQUEsSUFDakIsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFBQSxJQUM1QixVQUFVO0FBQUEsTUFDTixTQUFTLENBQUMsc0JBQXNCLGFBQWE7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=