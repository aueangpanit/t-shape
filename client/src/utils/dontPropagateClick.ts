export const dontPropagateClick = (
  fn: (params?: any) => Promise<void> | void
) => async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  e.stopPropagation()
  await fn()
}
