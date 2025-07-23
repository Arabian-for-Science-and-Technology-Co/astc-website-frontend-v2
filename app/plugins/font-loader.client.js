// plugins/font-loader.client.js
export default defineNuxtPlugin({
  hooks: {
    'app:mounted'() {
      const zarid = new FontFace('Zarid', 'url(/path/to/your/font.woff2)');
      zarid.load().then(() => {
        document.documentElement.classList.add('zarid-loaded');
      });
    }
  }
});