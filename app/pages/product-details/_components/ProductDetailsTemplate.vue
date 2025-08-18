<template>
  <div class=" ">
    <h2
      v-if="data?.[`title_${locale}`]"
      :class="[
        'font-title mt-[60px] text-[52px] font-[300] leading-[49.4px] tracking-[0.52px]',
        'lg:mt-[90px] lg:text-[70px] lg:leading-[87.5px] lg:tracking-[0.7px]'
      ]"
    >
      {{ data?.[`title_${locale}`] }}
    </h2>
    <Contnet v-if="rawContent" :content="rawContent" class="mt-[41px] lg:mt-[90px]" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Record<string, any> }>()
const { locale } = useI18n()
const rawContent = computed(() => props.data?.paragraph_block?.[`content_${locale.value}`] ?? '')
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
