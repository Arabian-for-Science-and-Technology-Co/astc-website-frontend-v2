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
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(271px,1fr))] gap-x-[16px] gap-y-[11px] lg:gap-y-[17px]"
      >
        <BaseInput
          size="xl"
          id="email"
          v-model="formData.email"
          label="E-mail"
          type="email"
          labelPlacement="inside"
          placeholder="you@example.com"
          :error="showError ? 'Please enter a valid email address' : null"
        />
        <BaseInput
          size="xl"
          id="email"
          v-model="formData.phone"
          label="Phone"
          type="phone"
          labelPlacement="inside"
        />
        <BaseInput
          size="xl"
          id="name"
          v-model="formData.name"
          label="Name"
          type="text"
          labelPlacement="inside"
        />
        <BaseInput
          size="xl"
          id="positionInCompany"
          v-model="formData.positionInCompany"
          label="Position in the company"
          type="text"
          labelPlacement="inside"
        />
        <BaseInput
          size="xl"
          id="CompanyName"
          v-model="formData.companyName"
          label="Company name"
          type="text"
          labelPlacement="inside"
        />
      </div>
      <div
        class="mb-[22.1px] mt-[24.5px] flex flex-col items-center gap-[16.32px] lg:mb-[25px] lg:mt-[38px] lg:gap-[17px]"
      >
        <button
          :disabled="canSubmit"
          :class="[
            'w-full max-w-[275px] rounded-3xl bg-[#0D1667] pb-[18.3px] pt-[17.2px] text-center text-[30px] font-[300] leading-[105%] tracking-[0.3px] text-white lg:pb-[19px] lg:pt-[18px]',
            'disabled:bg-[#DADADA]'
          ]"
        >
          Get the files
        </button>
        <p class="text-center text-[16px] font-[300] leading-[18px] text-[#64696D]">
          By submitting your data, you agree
          <br />
          to the
          <span class="text-[#0D1667]">Privacy Policy</span> &
          <span class="text-[#0D1667]">Terms and conditions</span>
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false }
})

const formData = reactive({
  email: '',
  phone: '',
  name: '',
  positionInCompany: '',
  companyName: ''
})
const canSubmit = computed(() => Object.keys(formData).every((k) => formData[k]))

function submit() {}
</script>
<!-- <ClickZoom
  img-class="w-full object-contain max-h-[90vh]"
  :src="selectedCertificate.image"
  :zoom="1.2"
  :lens-size="420"
/> -->
