import { isEmpty } from './index'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail (email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 校验金额(默认非必填, 大于等于0, 2位小数, 最大值不超过1001亿)
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const validateCheckAmount = (rule, value, callback) => {
  if (!rule.hasOwnProperty('min')) rule.min = 0
  if (!rule.hasOwnProperty('max')) rule.max = 100e8
  if (!rule.hasOwnProperty('isEqual0')) rule.isEqual0 = true // 是否可以为0(默认可以)
  const regNumber = /^(\-|\+)?\d+(\.\d+)?$/ // 数字：正数 负数 小数
  const regFloat = /^[-+]?(?:[0-9]|[1-9]\d*)(?:\.\d{1,2})?$/ // 2位小数校验规则(可以为负数)
  if (isEmpty(value)) return callback()
  if (!regNumber.test(value)) return callback(new Error('请输入数字'))
  if (!regFloat.test(value)) return callback(new Error('最多保留2位小数'))
  if (value < rule.min) return callback(new Error(`不能小于${rule.min}`))
  if (value > rule.max) return callback(new Error(`不能大于${rule.max}`))
  if (!rule.isEqual0 && value == 0) return callback(new Error(`不能为0`))
  callback()
}