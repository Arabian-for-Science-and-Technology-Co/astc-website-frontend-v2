import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addPlugin,
  resolveFiles,
  addImports
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'api-module', configKey: 'api' },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    /*---------------------------Components-----------------------------------------*/
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({ path: resolve('./components') })
    })
    /*---------------------------Composables-----------------------------------------*/
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./composables'))
    })
    /*---------------------------services-----------------------------------------*/
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./services'))
    })
    /*-------------------------------Plugin-------------------------------------*/
    const pluginDir = resolve('./plugins')
    const plugins = await resolveFiles(pluginDir, '**/*.{ts,js}')
    plugins.forEach((pluginPath) => {
      nuxt.options.plugins.push(pluginPath)
    })
  }
})
