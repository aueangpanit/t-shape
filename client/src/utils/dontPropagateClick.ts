export const dontPropagateClick = (fn: () => void) => (
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>
) => {
  e.stopPropagation()
  fn()
}
