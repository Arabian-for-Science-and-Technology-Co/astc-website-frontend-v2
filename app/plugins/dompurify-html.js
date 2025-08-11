import VueDOMPurifyHTML from 'vue-dompurify-html'
import DOMPurify from 'isomorphic-dompurify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDOMPurifyHTML, {
    default: {
      // allow semantic content, drop dangerous stuff
      ALLOWED_TAGS: [
        'p','br','hr','strong','em','u','s','blockquote','code','pre',
        'h1','h2','h3','h4','h5','h6',
        'ul','ol','li','table','thead','tbody','tr','th','td',
        'img','a','figure','figcaption','span','div'
      ],
      ALLOWED_ATTR: ['href','src','alt','title','width','height'],
      FORBID_TAGS: ['style','script','iframe','object','embed','link','meta']
    },
    hooks: {
      afterSanitizeAttributes(node) {
        if (node.tagName === 'A' && node.getAttribute) {
          const href = node.getAttribute('href') || ''
          node.setAttribute('rel', 'ugc nofollow noopener noreferrer')
          if (/^https?:\/\//i.test(href)) node.setAttribute('target', '_blank')
        }
      }
    }
  }, () => DOMPurify)
})
