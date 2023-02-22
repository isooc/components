
// 工具类
import store from '../store'
import $Request from '@/api'
import axios from 'axios'
import { ElMessage } from 'element-plus'
/**
 * 深复制
 * @export
 * @param {*} source
 * @returns
 */
export function copy(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {}
                targetObj[keys] = copy(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        }
    }
    return targetObj
}

/**
 *判断是否为空
 *
 * @export
 * @param {*} val 字符串 对象
 * @returns
 */
export function isEmpty(val) {
    if (val === undefined || val === null || val === '' || val.length === 0) {
        return true
    }
    if (typeof val === 'string') {
        if (val.trim().length === 0) return true
    } else if (typeof val === 'object') {
        if (JSON.stringify(val) === '{}') return true
    }
    return false
}

/**
 * 格式话日期
 *
 * @export date
 * @param {*} pattern
 * @returns
 */
export function formatDate(date, pattern) {
    let newDate = new Date(date)
    let o = {
        'M+': newDate.getMonth() + 1, // 月份
        'd+': newDate.getDate(), // 日
        'h+': newDate.getHours(), // 小时
        'm+': newDate.getMinutes(), // 分
        's+': newDate.getSeconds(), // 秒
        'q+': Math.floor((newDate.getMonth() + 3) / 3), // 季度
        S: newDate.getMilliseconds(), // 毫秒
    }

    if (/(y+)/.test(pattern)) pattern = pattern.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(pattern)) pattern = pattern.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
    return pattern
}

/**
 *更新对象值
 *
 * @export
 * @param {*} original
 * @param {*} obj
 * @returns
 */
export function setKeyValue(original, obj) {
    for (const key in obj) {
        original[key] = obj[key]
    }
    return original
}

/**
 * 设备类型判断
 */
export function os() {
    let ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
    }
}

export function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return unescape(r[2])
    }
    return null
}

/**
 * 导出
 */
export function exportData(apiUrl, params, fileName) {
    axios({
        method: 'post',
        url: apiUrl,
        responseType: 'blob',
        headers: {
            token: 'token',
            'Content-Type': 'application/json',
        },
        data: params,
    }).then(res => {
        // 处理返回的文件流
        const blob = new Blob([res.data])
        const file_name = fileName + '.xls'
        const elink = document.createElement('a')
        elink.download = file_name
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    })
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}

