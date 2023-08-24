export type ValueWitchEmpty = string | null | undefined

export interface VerifyInputCommon {
  /** 输入内容 */
  modelValue?: ValueWitchEmpty
  /** 输入类型 */
  type?: 'text' | 'password'
}

export interface VerifyInputItemProps extends VerifyInputCommon {
  /** 是否焦点 */
  focused?: boolean
}

export interface VerifyInputItemEvents {
  /** 内容改变 */
  (event: 'update:modelValue', value: ValueWitchEmpty): void
  /** 内容删除 */
  (event: 'clear', focusChange?: boolean): void
  /** 黏贴事件 */
  (event: 'onPaste', value: string): void
  /** 焦点事件 */
  (event: 'focus', payload: FocusEvent): void
}

export interface VerifyInputProps extends VerifyInputCommon {
  /** 输入框数量 */
  length?: number
  /** 是否默认焦点 */
  defaultFocus?: boolean
}

export interface VerifyInputEvents {
  /** 内容改变 */
  (event: 'update:modelValue', value: ValueWitchEmpty): void
  /** 输入完成事件 */
  (event: 'onComplete', value: ValueWitchEmpty): void
}
