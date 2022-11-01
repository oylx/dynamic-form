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
