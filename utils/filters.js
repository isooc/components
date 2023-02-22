import dayjs from 'dayjs'

/**
 * 按格式进行日期过滤
 *
 * @export
 * @param {any} date
 * @param {string} format   // 格式
 * @returns {string}
 */
// 年月日
export function dateFormat(date, format = 'YYYY-MM-DD') {
    if (!date || !new Date(date)) return ''
    return dayjs(date).format(format)
}

/**
 * 按格式进行日期过滤
 *
 * @export
 * @param {any} date
 * @param {string} format   // 格式
 * @returns {string}
 */
// 年月日时分秒
export function dateTimeFormat(date, format = 'YYYY-MM-DD HH:mm') {
    if (!date || !new Date(date)) return ''
    return dayjs(date).format(format)
}

// 第n天
export function addDay(n, format = 'YYYY-MM-DD HH:mm') {
    if (!n) return ''
    return dayjs().add(n, 'day').format(format)
}

/**
 * 手机号加密过滤
 *
 * @export
 * @param {*} str
 * @returns
 */
export function phoneFormat(val) {
    let str = val + ''
    return str.substring(0, 3) + '****' + str.substring(7)
}

/**
 * 显示百分比
 */
export function showPercent(val) {
    return (val * 100).toFixed(2) + '%'
}

/**
 * 显示百分比 保留两位小数
 */
export function percentTwoNum(val) {
    if (val === null || val === undefined) {
        return ''
    }
    if (val < 0.01) {
        return '< 1%'
    }
    return Math.round(val * 10000) / 100.0 + '%'
}

/**
 * 保留 { num } 位小数
 */
export function decimalTwoNum(val, num = 2) {
    if (val === null || val === undefined) {
        let v = 0
        return v.toFixed(num)
    }
    return (Math.round(val * 10000) / 100).toFixed(num)
}

/**
 * 处理金额
 * 补全小数点后2位
 */
export function moneyFilter(val, num = 2) {
    if (isNaN(val)) {
        let v = 0
        return v.toFixed(num)
    }
    return Number(val).toFixed(num)
}

/**
 * 格式化金额
 *
 * @export
 * @param {*} v
 * @returns
 */
export function moneyFormat(v) {
    if (isNaN(v)) {
        return v
        // return 0.00
    }
    v = Math.round((v - 0) * 100) / 100
    v = v === Math.floor(v) ? v + '.00' : v * 10 === Math.floor(v * 10) ? v + '0' : v
    v = String(v)
    var ps = v.split('.')
    var whole = ps[0]
    var sub = ps[1] ? '.' + ps[1] : '.00'
    var r = /(\d+)(\d{3})/
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2')
    }
    v = whole + sub

    return v
}

/**
 * 格式化注册资本
 */
export function registeredCapitalFilter(val, num = 2) {
    if (isNaN(val)) {
        return '0'
    }
    let money = Number(val).toFixed(num)

    for (let i = 1; i <= 2; i++) {
        if (money.slice(-1) === '0') {
            money = Number(money).toFixed(num - i)
        }
    }

    return money
}

/**
 * 保留 { num } 位小数
 */
export function transRatio(val, num = 2) {
    if (val === null || val === undefined) {
        let v = 0
        return v.toFixed(num)
    }
    return ((val * 10000) / 100).toFixed(num)
}
