/**
 * @description: [深复制]
 * @param {Object} obj [被复制的对象]
 * @return {Object}  [复制后的对象]
 */
export const deepCopy = obj => {
  let newobj
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    newobj = []
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    newobj = {}
  } else {
    newobj = obj
  }

  if (typeof obj !== 'object') {
    return
  }

  for (var key in obj) {
    newobj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
  }
  return newobj
}

/**
 * @param {}
 * @returns
 * 函数防抖
 */
export const debounce = (fn, delay = 500) => {
  let timer = null
  return function() {
    const args = arguments
    if (timer) clearTimeout(timer)
    timer = null
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * @param {}
 * @returns uuid
 * 创建 uuid
 */
export function createUUID() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}
