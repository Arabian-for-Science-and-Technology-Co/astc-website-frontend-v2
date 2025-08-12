<template>
  <div class=" ">
    <h2
      v-if="data?.[`title_${locale}`]"
      :class="[
        'font-title text-[52px] font-[300] leading-[49.4px] tracking-[0.52px]',
        'lg:text-[70px] lg:leading-[87.5px] lg:tracking-[0.7px]'
      ]"
    >
      {{ data?.[`title_${locale}`] }}
    </h2>

    <article
      v-if="contentHtml"
      :class="[
        'mt-[41px] space-y-[30px] text-[20px] font-[300] leading-[105%] tracking-[0.2px] rtl:leading-[130%]',
        'lg:mt-[90px] lg:space-y-[38px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]',
        '[&_:is(strong)]:font-[600]',
        '[&_:is(ul,ol)]:w-[90%]',
        '[&_:is(ul,ol)]:list-outside',
        '[&_:is(ul,ol)]:space-y-4',
        '[&_:is(ul,ol)]:ps-6',
        '[&_ul]:list-disc',
        '[&_ol]:list-decimal'
      ]"
      v-dompurify-html="contentHtml"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()
const { locale } = useI18n()

const rawContent = computed(() => props.data?.paragraph_block?.[`content_${locale.value}`] ?? '')

/**
 * If the backend sent pure text, wrap it in <p> and keep newlines.
 * If it already contains tags, pass it through unchanged.
 */
const contentHtml = computed(() => {
  const s = String(rawContent.value || '').trim()
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(s)
  if (looksLikeHtml) return s
  if (!s) return ''
  const blocks = s.split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
  return blocks.join('')
})
</script>

<style>
.font-title {
  font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif !important;
}
@media (min-width: 1024px) {
  .font-title {
    font-family: Roboto !important;
  }
}
</style>
