export interface CodeInputProps {
  /** 输入数量(默认:6) */
  length?: number
}

export interface CodeInputEvents {
  /** 键入内容改变 */
  (event: 'onInput', value: string): void
}
