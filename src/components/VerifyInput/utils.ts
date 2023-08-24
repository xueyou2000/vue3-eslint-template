import { ValueWitchEmpty } from './types'

/**
 * 获取为空的索引
 */
export function findEmptyChatIndex(charList: ValueWitchEmpty[]) {
  return charList.findIndex((v) => !v)
}

/**
 * 获取单个字符
 */
export function getChar(str: ValueWitchEmpty, index: number) {
  if (!str) return null
  return str[index]
}

/**
 * 获取下一个焦点索引
 */
export function getNextIndex(str: ValueWitchEmpty) {
  if (!str) return 0
  return str.length
}

/**
 * 创建字符数组
 */
export function createCharList(length: number, str?: ValueWitchEmpty): ValueWitchEmpty[] {
  return Array.from({ length }, (_, i) => (str ? str[i] || null : null))
}

/**
 * 字符数组转字符串
 */
export function charListToString(charList: ValueWitchEmpty[]) {
  return charList.join('')
}

/**
 * 往前补齐
 */
export function paddingCharList(str: ValueWitchEmpty[], index: number) {
  const result = [...str]
  for (let i = index; i <= result.length - 1; ++i) {
    const nextIndex = i + 1
    result[i] = nextIndex < result.length ? result[nextIndex] : null
  }
  return result
}
