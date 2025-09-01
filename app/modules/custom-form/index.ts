// modules/custom-form/index.ts
import { defineNuxtModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

export interface CustomFormModuleOptions {
  prefix?: string
  autoImportComponents?: boolean
  autoImportComposables?: boolean
}

export default defineNuxtModule<CustomFormModuleOptions>({
  meta: { name: 'custom-form', configKey: 'customForm' },
  defaults: {
    prefix: 'Cf',
    autoImportComponents: true,
    autoImportComposables: false
  },
  async setup(options) {
    const { resolve } = createResolver(import.meta.url)

    if (options.autoImportComponents)
      addComponentsDir({
        path: resolve('./components'), // your modules/custom-form/components/
        prefix: options.prefix, // '' -> <FormTest/>, 'Cf' -> <CfFormTest/>
        pathPrefix: false // don’t add folder names to the tag
      })

    if (options.autoImportComposables) addImportsDir(resolve('./composables')) // for TS/JS composables only
  }
})
