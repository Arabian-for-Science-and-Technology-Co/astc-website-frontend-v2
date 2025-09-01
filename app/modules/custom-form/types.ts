export type Rule = (
  value: unknown,
  ctx: { form: Record<string, unknown>; name: string }
) => true | string | Promise<true | string>

export interface AppFormExpose {
  validate(): Promise<{ valid: boolean; errors: Record<string, string> }>
  reset(): void
  focusFirstInvalid(): void
}
