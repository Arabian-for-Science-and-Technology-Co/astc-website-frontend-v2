<template>
  <CfAppForm
    ref="formRef"
    @submit="handleSubmit"
    class="h-[70vh] max-h-[500px] overflow-y-auto px-[27px] pt-[19px] lg:h-fit lg:max-h-[80vh] lg:px-[40px] lg:pt-[32px]"
  >
    <div class="grid grid-cols-1 gap-x-[16px] gap-y-[12px] lg:grid-cols-2 lg:gap-y-[17px]">
      <CfBaseInput
        size="xl"
        id="email"
        v-model="formData.email"
        :label="$t('email')"
        type="email"
        :rules="[inptRules.required, inptRules.email]"
        required
        labelPlacement="inside"
        placeholder="you@example.com"
      />
      <CfBaseInput
        size="xl"
        id="phone"
        v-model="formData.phone"
        :label="$t('phone')"
        type="tel"
        :rules="[inptRules.required, inptRules.phoneDigits]"
        inputmode="numeric"
        maxlength="20"
        required
        labelPlacement="inside"
      />
      <CfBaseInput
        size="xl"
        id="name"
        v-model="formData.name"
        :rules="[inptRules.required]"
        :label="$t('name')"
        required
        type="text"
        labelPlacement="inside"
      />
      <CfBaseInput
        size="xl"
        id="positionInCompany"
        v-model="formData.positionInCompany"
        :rules="[inptRules.required]"
        :label="$t('position_in_the_company')"
        required
        type="text"
        labelPlacement="inside"
      />
      <CfBaseInput
        size="xl"
        class="lg:col-span-2"
        required
        id="CompanyName"
        v-model="formData.companyName"
        :rules="[inptRules.required]"
        :label="$t('company_name')"
        type="text"
        labelPlacement="inside"
      />
    </div>
    <div
      class="mb-[22.1px] mt-[24.5px] flex flex-col items-center gap-[16.32px] lg:mb-[25px] lg:mt-[38px] lg:gap-[17px]"
    >
      <button
        type="submit"
        :class="[
          'w-full max-w-[275px] rounded-3xl bg-[#0D1667] pb-[18.3px] pt-[17.2px] text-center text-[30px] font-[300] leading-[105%] tracking-[0.3px] text-white lg:pb-[19px] lg:pt-[18px]',
          'disabled:bg-[#DADADA]'
        ]"
      >
        {{ $t('get_the_files') }} {{ isLoading ? '...' : '' }}
      </button>

      <button type="button" @click="handelReset">reset</button>
    </div>
  </CfAppForm>
</template>

<script setup lang="ts">
import type { AppFormExpose } from '~/modules/custom-form/types'
import { useInputRules } from '~/modules/custom-form/composables/useInputRules'
const inptRules = useInputRules()

const props = defineProps({
  open: { type: Boolean },
  itemId: { type: [String, Number] }
})
const emits = defineEmits(['update:open'])
const { $toast } = useNuxtApp()
const formRef = ref<AppFormExpose | null>(null)

type FormData = {
  email: string
  phone: string
  name: string
  positionInCompany: string
  companyName: string
}
const formData = reactive<FormData>({
  email: '',
  phone: '',
  name: '',
  positionInCompany: '',
  companyName: ''
})
const isLoading = ref(false)

const resetFormData = () =>
  (Object.keys(formData) as (keyof FormData)[]).forEach((k) => (formData[k] = ''))
const { apiFetch } = useApi()
async function handleSubmit() {
  const res = await formRef.value?.validate()
  console.log('res', res)

  if (!res?.valid) return formRef.value?.focusFirstInvalid()
  if (isLoading.value) return
  isLoading.value = true

  const payload = {
    item_id: props?.itemId,
    full_name: formData?.name,
    email: formData?.email,
    phone: formData?.phone,
    position: formData?.positionInCompany,
    company_name: formData?.companyName
  }

  try {
    const response = await apiFetch('/website/home/request-files', {
      method: 'POST',
      body: payload
    })
    $toast.success(response?.message, { duration: 4000 })
    emits('update:open', false)
    resetFormData()
  } catch (err) {
    console.error(err)
    useHandleErrorMsg(err)
  } finally {
    isLoading.value = false
  }
}
function handelReset() {
  formRef.value?.reset()
}
watch(
  () => props.open,
  (val) => {
    val && resetFormData()
  }
)
</script>
