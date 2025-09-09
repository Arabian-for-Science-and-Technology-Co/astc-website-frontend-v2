export type FieldSize = 'sm' | 'md' | 'lg' | 'xl'

export const CONTROL_BASE = [
  'block w-full rounded-[12px] bg-[#F1F4F7] text-[#000] border border-transparent',
  'focus:outline-none focus:bg-white',
  '[&:not(:placeholder-shown)]:bg-white',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500'
].join(' ')

export const CONTROL_ERROR = 'border-red-500 focus:ring-red-500 focus:border-red-500'
export const CONTROL_OK = 'border-gray-300'
export const PLACEHOLDER = 'placeholder:text-[#999FA3]'

export const LABEL_ABOVE = 'mb-1 block text-black text-[20px] leading-[150%] font-[400]'
export const FLOATING_COMMON = [
  'pointer-events-none absolute start-[16px] top-1/2 -translate-y-1/2 bg-transparent px-0 text-[#999FA3]',
  'transition-all duration-150',
  'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0',
  'peer-focus:-top-3 peer-focus:start-[6px] peer-focus:translate-y-0 peer-focus:bg-white',
  'peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:start-[6px] peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:bg-white',
  'dark:peer-hover:bg-gray-900 dark:peer-focus:bg-gray-900 dark:peer-[&:not(:placeholder-shown)]:bg-gray-900'
].join(' ')

export const SIZES: Record<FieldSize, { control: string; label: string; floatLabel?: string }> = {
  sm: { control: 'h-9 px-3 text-sm', label: 'text-[20px] font-[400]' },
  md: { control: 'h-10 px-3.5 text-sm', label: 'text-[20px] font-[400]' },
  lg: { control: 'h-12 px-4 text-base', label: 'text-[20px] font-[400]' },
  xl: {
    control: 'h-[50px] px-[19px] text-[20px] font-[300] leading-[150%]',
    label: 'text-[20px] font-[300] leading-[150%]',
    floatLabel: [
      'peer-focus:text-base peer-focus:!px-[10px] peer-focus:!py-[0px]',
      'peer-[&:not(:placeholder-shown)]:text-base peer-[&:not(:placeholder-shown)]:!px-[10px] peer-[&:not(:placeholder-shown)]:!py-[0px]'
    ].join(' ')
  }
}

export const DESC = 'mt-1 text-xs text-gray-500'
export const ERR = 'mt-1 text-xs text-red-600'
