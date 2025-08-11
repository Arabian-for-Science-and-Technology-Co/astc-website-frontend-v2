<template>
  <div class="app-container app-container--edit mt-[100px] lg:mt-[180px] 3xl:mt-[184px]">
    <h2
      v-if="data?.[`title_${locale}`]"
      :class="[
        'text-[52px] font-[200] leading-[49.4px] tracking-[0.52px]',
        'lg:text-[90px] lg:leading-[85.5px] lg:tracking-[0.9px]'
      ]"
    >
      {{ data?.[`title_${locale}`] }}
    </h2>

    <article
      v-if="data?.[`content_${locale}`]"
      :class="[
        'mt-[40px] space-y-[38px] text-[20px] font-[300] leading-[105%] tracking-[0.2px]',
        'lg:mt-[65px] lg:text-[30px] lg:leading-[110%] lg:tracking-[0.3px]',
        '[&_:is(ul,ol)]:w-[90%]',
        '[&_:is(ul,ol)]:list-outside',
        '[&_:is(ul,ol)]:space-y-4',
        '[&_:is(ul,ol)]:ps-6',
        '[&_ul]:list-disc',
        '[&_ol]:list-decimal'
      ]"
      v-dompurify-html="contentHtml"
    />

    <BaseButton
      v-if="data?.cta_link"
      :class="[
        'font-section mt-[40px] h-[68px] max-w-[295px] text-[16px] font-[500] leading-[normal] lg:mt-[95px]',
        'lg:text-[20px] lg:font-[400] lg:leading-[21px] lg:tracking-[0.2px]'
      ]"
    >
      {{ data?.[`cta_text_${locale}`] }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()
const { locale } = useI18n()

const rawContent = computed(() => props.data?.[`content_${locale.value}`] ?? '')

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
.app-container--edit {
  @media (min-width: 1600px) {
    padding-inline-start: 438px;
    padding-inline-end: 586px;
  }
}
.font-section {
  font-family: Roboto !important;
}
@media (min-width: 1024px) {
  .font-section {
    font-family: '29LT Zarid Sans AL', 'Zarid-Fallback', system-ui, sans-serif !important;
  }
}
</style>
