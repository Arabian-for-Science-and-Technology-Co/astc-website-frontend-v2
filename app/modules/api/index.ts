import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addPlugin,
  resolveFiles,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'api-module', configKey: 'api' },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addImportsDir(resolve('./components'))
    addImportsDir(resolve('./composables'))
    addImportsDir(resolve('./services'))

    // wait until all modules finished registering -- including third-party
    nuxt.hook('modules:done', async () => {
      const pluginDir = resolve('./plugins')
      const plugins = await resolveFiles(pluginDir, '**/*.{ts,js}')
      // add each plugin using Nuxt helper
      for (const pluginPath of plugins) {
        addPlugin(pluginPath)
      }
    })
  }
})
