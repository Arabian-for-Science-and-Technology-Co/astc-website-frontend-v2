<template>
  <BaseModal
    :model-value:open="modalOpen"
    @update:modelValue:open="$emit('update:modelValue:open', $event)"
    containerClass="w-full !h-auto  text-black lg:max-w-[500px] 3xl:!max-w-[639px] "
    headerClass="lg:px-[40px] px-[27px]"
    bodyClass=""
    footerClass="lg:px-[40px] px-[27px]"
    form-mode
    :showOutsideCloseBtn="false"
  >
    <template #header>
      <h3 :class="['text-[30px] font-[300] leading-[100%] lg:max-w-[312px]']">
        Leave your contacts to receive all the files on the project
      </h3>
    </template>
    <div
      class="h-[70vh] overflow-y-auto px-[27px] pt-[19px] lg:h-fit lg:max-h-[80vh] lg:px-[40px] lg:pt-[32px]"
    >
      <BaseInput
        size="xl"
        id="email"
        v-model="email"
        label="E-mail"
        type="email"
        labelPlacement="inside"
        placeholder="you@example.com"
        :error="showError ? 'Please enter a valid email address' : null"
      />

    
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false }
})

const email = ref('')
const showError = ref(false)

function submit() {
  showError.value = !/.+@.+\..+/.test(email.value)
}
</script>
<!-- <ClickZoom
  img-class="w-full object-contain max-h-[90vh]"
  :src="selectedCertificate.image"
  :zoom="1.2"
  :lens-size="420"
/> -->
