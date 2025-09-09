export type FieldColors = {
  bg: string; fg: string; placeholder: string;
  border: string; borderFocus: string; borderActive: string;
  bgFocus: string; bgActive: string;
  error: string; desc: string; err: string;
}

export const lightColors: FieldColors = {
  bg: '#F1F4F7',
  fg: '#000000',
  placeholder: '#999FA3',
  border: '#D1D5DB',
  borderFocus: '#9999994D',
  borderActive: '#9999994D',
  bgFocus: '#FFFFFF',
  bgActive: '#FFFFFF',
  error: '#EF4444',
  desc: '#6B7280',
  err: '#DC2626',
}

export const darkColors: FieldColors = {
  bg: '#0B1220',
  fg: '#F8FAFC',
  placeholder: '#94A3B8',
  border: '#1F2937',
  borderFocus: '#334155',
  borderActive: '#334155',
  bgFocus: '#0F172A',
  bgActive: '#0F172A',
  error: '#F87171',
  desc: '#94A3B8',
  err: '#FCA5A5',
}

export function toCssVars(c: FieldColors): Record<string, string> {
  return {
    '--cf-bg': c.bg,
    '--cf-fg': c.fg,
    '--cf-placeholder': c.placeholder,
    '--cf-border': c.border,
    '--cf-border-focus': c.borderFocus,
    '--cf-border-active': c.borderActive,
    '--cf-bg-focus': c.bgFocus,
    '--cf-bg-active': c.bgActive,
    '--cf-error': c.error,
    '--cf-desc': c.desc,
    '--cf-err': c.err,
  }
}
