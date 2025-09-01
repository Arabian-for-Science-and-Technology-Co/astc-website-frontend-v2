import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
  addPlugin,
  resolveFiles
} from '@nuxt/kit'

export interface CustomFormModuleOptions {
  prefix?: string // e.g. 'Cf'
  autoImportComponents?: boolean
  autoImportComposables?: boolean
}

export default defineNuxtModule<CustomFormModuleOptions>({
  meta: {
    name: 'lib-form',
    configKey: 'libForm'
  },
  defaults: {
    prefix: 'Lf',
    autoImportComponents: false,
    autoImportComposables: false
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const prefix = options.prefix ?? 'Lf'

    if (options.autoImportComponents) {
      await addComponentsDir({
        path: resolve('./runtime/components'),
        prefix,
        pathPrefix: false
      })
    }

    if (options.autoImportComposables) {
      const composablesDir = resolve('./runtime/composables')
      addImportsDir(composablesDir) // registers plain names (e.g. useForm)

      // duplicate as prefixed aliases (e.g. useCfForm)
      nuxt.hook('imports:extend', (imports) => {
        // clone array snapshot to avoid iterating over entries we push
        for (const i of [...imports]) {
          if (!i.from || !i.name) continue
          if (!i.from.startsWith(composablesDir)) continue

          const base = i.as || i.name
          // If it’s a composable that starts with "use", insert prefix after "use"
          const as = base.startsWith('use')
            ? `use${prefix}${base.slice(3)}`
            : `${prefix}${base.charAt(0).toUpperCase()}${base.slice(1)}`

          // avoid duplicates
          if (!imports.some((x) => x.as === as || x.name === as)) {
            imports.push({ ...i, as })
          }
        }
      })
    }

    const pluginDir = resolve('./runtime/plugins')
    const plugins = await resolveFiles(pluginDir, '**/*.{ts,js,mjs,cjs}')
    for (const p of plugins) addPlugin(p)
  }
})
