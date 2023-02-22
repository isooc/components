import { isEmpty } from './index'
import { validateCheckAmount } from './validate'

/**
 * 字数校验
 * max: 最大值
 * required: 是否必填
 */
const validString = (rule, value, callback) => {
    let max = typeof rule.max !== 'undefined' ? rule.max : 255
    let required = typeof rule.required !== 'undefined' ? rule.required : true
    let type = typeof rule.type !== 'undefined' ? rule.type : 'string'

    if (!isEmpty(value) && value.length > max) {
        callback(new Error(`该字段最长输入${max}`))
    }
    // Emoji 过滤
    if (!isEmpty(value)) {
        let type = Object.prototype.toString.call(value)
        if (type === '[object String]') {
            let flag = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
            if (flag) {
                return callback(new Error('输入值含有非法字符，请重新输入'))
            }
        }
    }
    if (required && isEmpty(value)) {
        callback(new Error('请输入'))
    }
    callback()
}

/**
 * 金额校验
 * limitMin: 最小值 默认0
 * limitMax: 最大值 默认100亿
 * equal: 最小值是否可以等于(用于是否可以等于0): 默认true(可以等于0)
 */
const validateAmount = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : true
    let limitMin = typeof rule.limitMin !== 'undefined' ? rule.limitMin : 0
    let limitMax = typeof rule.limitMax !== 'undefined' ? rule.limitMax : 100e8
    let equal = typeof rule.equal !== 'undefined' ? rule.equal : true
    // 必填
    if (required && isEmpty(value)) {
        return callback(new Error('请输入'))
    }
    if (equal && value !== null && value !== undefined && value !== '' && value - 0 < limitMin) {
        return callback(new Error('不能小于' + limitMin))
    }
    if (!equal && value !== null && value !== undefined && value !== '' && value - 0 <= limitMin) {
        return callback(new Error('不能小于等于' + limitMin))
    }
    if (isNaN(value) && !isEmpty(value)) {
        return callback(new Error('请输入数字'))
    }
    // let reg = /^[0-9]\d*(\.\d{1,2})?$|^0+(\.\d{1,2})?$/
    let reg = /^[-+]?(?:[0-9]|[1-9]\d*)(?:\.\d{1,2})?$/
    if (!reg.test(value) && !isEmpty(value)) {
        return callback(new Error('金额最多保留2位小数'))
    }
    if (value > limitMax) {
        return callback(new Error('不能大于' + limitMax))
    }
    callback()
}

/**
 * 校验是否可以为0
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
// const validEqual0 = (rule, value, callback) => {
//     if (!isEmpty(value) && value == 0) callback(new Error('不能为0'))
//     callback()
// }

/**
 * 校验手机号
 * required: 是否必填, 默认false
 */
const validatePhone = (rule, value, callback) => {
    // let required = typeof rule.required !== 'undefined' ? rule.required : false
    // const reg = new RegExp(/^1[3-9]\d{9}$/)
    // if (required) {
    //     if (isEmpty(value)) {
    //         return callback(new Error('请输入'))
    //     }
    //     if (!reg.test(value)) {
    //         return callback(new Error('请输入正确的手机号码'))
    //     }
    //     callback()
    // } else {
    //     if (isEmpty(value)) {
    //         callback()
    //     } else {
    //         if (!reg.test(value)) {
    //             return callback(new Error('请输入正确的手机号码'))
    //         }
    //         callback()
    //     }
    // }
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    const reg = new RegExp(/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/)
    if (required) {
        if (isEmpty(value)) {
            return callback(new Error('请输入'))
        }
        if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机号码或手机号码'))
        }
        callback()
    } else {
        if (isEmpty(value)) {
            callback()
        } else {
            if (!reg.test(value)) {
                return callback(new Error('请输入正确的座机号码或手机号码'))
            }
            callback()
        }
    }
}

/**
 * 电话校验
 * required: 是否必填, 默认false
 */
const validateMobile = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    const reg = new RegExp(/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/)
    if (required) {
        if (isEmpty(value)) {
            return callback(new Error('请输入'))
        }
        if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机号码或手机号码'))
        }
        callback()
    } else {
        if (isEmpty(value)) {
            callback()
        } else {
            if (!reg.test(value)) {
                return callback(new Error('请输入正确的座机号码或手机号码'))
            }
            callback()
        }
    }
}

/**
 * 纳税识别号
 * required: 是否必填, 默认false
 */
const validateTaxNo = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    let max = typeof rule.max !== 'undefined' ? rule.max : 255
    const reg = new RegExp(/^[A-Za-z0-9]+$/)
    if (!isEmpty(value) && value.length > max) {
        callback(new Error(`该字段最长输入${max}`))
    }

    if (!reg.test(value)) {
        return callback(new Error('请输入正确的纳税识别号'))
    }

    if (required && isEmpty(value)) {
        callback(new Error('请输入'))
    }

    callback()
}

/**
 * 校验固定电话
 *
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @returns
 */
const validCompanyTel = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    const reg = new RegExp(/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/)
    if (required) {
        if (isEmpty(value)) {
            return callback(new Error('请输入'))
        }
        if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机号码或手机号码'))
        }
        callback()
    } else {
        if (isEmpty(value)) {
            callback()
        } else {
            if (!reg.test(value)) {
                return callback(new Error('请输入正确的座机号码或手机号码'))
            }
            callback()
        }
    }
}

/**
 * 比例
 */
const validRatio = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    if (!value) {
        callback()
    }
    if (value <= 0) {
        return callback(new Error('不能小于等于0'))
    }
    if (isNaN(value)) {
        return callback(new Error('请输入数字'))
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error('请输入小数点2位以内数字'))
    }
    if (value > 100) {
        return callback(new Error('税率不能超过100!'))
    }
    if (required && isEmpty(value)) {
        callback(new Error('请输入'))
    }
    callback()
}

/**
 * 税率
 */
const validTaxRate = (rule, value, callback) => {
    let required = typeof rule.required !== 'undefined' ? rule.required : false
    if (!value) {
        callback()
    }
    if (value <= 0) {
        return callback(new Error('不能小于等于0'))
    }
    if (isNaN(value)) {
        return callback(new Error('请输入数字'))
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error('请输入小数点2位以内数字'))
    }
    if (value > 100) {
        return callback(new Error('税率不能超过100!'))
    }
    if (required && isEmpty(value)) {
        callback(new Error('请输入'))
    }
    callback()
}

/**
 * 材料清单-数量, 4位小数
 */
const validNum = (rule, value, callback) => {
    // 必填
    if (!value) {
        return callback(new Error('请输入'))
    }
    if (isNaN(value)) {
        return callback(new Error('请输入数字'))
    }
    if (!/^\d+(\.\d{1,4})?$/.test(value)) {
        return callback(new Error('请输入小数点4位以内'))
    }
    if (value > 10000000000) {
        return callback(new Error('不能超过100亿'))
    }
    callback()
}

/**
 * 不超过100的正整数
 */
const validNum100 = (rule, value, callback) => {
    // 必填
    if (!value) {
        callback()
    }
    if (isNaN(value) && value) {
        return callback(new Error('请输入数字'))
    }
    if (!/^[+]{0,1}(\d+)$/.test(value)) {
        return callback(new Error('请输入正整数'))
    }
    if (value > 100) {
        return callback(new Error('不能超过100'))
    }
    callback()
}
/**
 * 正整数
 */
const validNumber = (rule, value, callback) => {
    // 必填
    if (!value) {
        callback()
    }
    if (isNaN(value) && value) {
        return callback(new Error('请输入数字'))
    }
    if (!/^[+]{0,1}(\d+)$/.test(value)) {
        return callback(new Error('请输入正整数'))
    }
    callback()
}

// 非正整数
const validNegativeNumber = (rule, value, callback) => {
    // 必填
    if (!value) {
        callback()
    }
    if (isNaN(value) && value) {
        return callback(new Error('请输入数字'))
    }
    if (!/^((-\d+)|(0+))$/.test(value)) {
        return callback(new Error('请输入负整数或零'))
    }
    callback()
}

// 银行账户
const validAccountNo = (rule, value, callback) => {
    if (!value) {
        callback()
    }
    if (value && !/^[0-9a-zA-Z]+$/.test(value)) {
        return callback(new Error('只能输入数字或字母'))
    }
    callback()
}

let rules = {
    checkAmount: [{ validator: validateCheckAmount, trigger: 'change' }],
    select: [{ required: true, message: '请选择', trigger: 'change' }],
    required: [{ required: true, message: '请输入', trigger: 'change' }],
    amount: [{ required: false, validator: validateAmount, trigger: 'change' }],
    amount0: [{ required: false, validator: validateAmount, trigger: 'change', equal: false }],
    amountRequired0: [{ required: true, validator: validateAmount, trigger: 'change', equal: false }],
    amountRequired: [{ required: true, validator: validateAmount, trigger: 'change' }],
    mobileRequired: [{ required: true, validator: validateMobile, trigger: 'change', max: 15 }],
    mobile: [{ required: false, validator: validateMobile, trigger: 'change', max: 15 }],
    taxNo: [{ required: false, validator: validateTaxNo, trigger: 'change', max: 18 }], // 纳税识别号
    taxNoRequired: [{ required: true, validator: validateTaxNo, trigger: 'change', max: 18 }], // 纳税识别号
    companyTel: [{ validator: validCompanyTel, trigger: 'change' }], // 电话
    phone: [{ required: false, validator: validatePhone, trigger: 'change' }], // 手机
    phoneRequired: [{ required: true, validator: validatePhone, trigger: 'change' }], // 手机必填
    ratio: [{ required: false, validator: validRatio, trigger: 'change' }], // 比例
    taxRate: [{ required: false, validator: validTaxRate, trigger: 'change' }], // 税率
    num4: [
        { required: true, validator: validNum, trigger: 'change' },
        { required: false, validator: validString, max: 20, trigger: 'change' },
    ], // 材料清单数量, 4位小数
    num100: [
        { required: false, validator: validNum100, trigger: 'change' },
        { required: true, message: '请输入', trigger: 'change' },
    ], // 不超过100的正整数
    num: [
        { required: false, validator: validNumber, trigger: 'change' },
        { required: true, message: '请输入', trigger: 'change' },
    ], // 正整数
    negativeNum: [
        { required: false, validator: validNegativeNumber, trigger: 'change' },
        { required: true, message: '请输入', trigger: 'change' },
    ], // 非正整数
    accountNo: [
        { required: false, validator: validAccountNo, trigger: 'change' },
        { required: false, validator: validString, max: 30, trigger: 'change' },
    ], // 银行账号, 只能输入数字或字母, 30字符
    accountNoRequired: [
        { required: false, validator: validAccountNo, trigger: 'change' },
        { required: true, validator: validString, max: 30, trigger: 'change' },
    ], // 银行账号, 只能输入数字或字母, 30字符
    str1000: [{ required: false, validator: validString, trigger: 'change', max: 1000 }],
    str500: [{ required: false, validator: validString, trigger: 'change', max: 500 }],
    strRequired500: [{ required: true, validator: validString, trigger: 'change', max: 500 }],
    str300: [{ required: false, validator: validString, trigger: 'change', max: 300 }],
    strRequired250: [{ required: true, validator: validString, trigger: 'change', max: 250 }],
    str200: [{ required: false, validator: validString, trigger: 'change', max: 200 }],
    strRequired200: [{ required: true, validator: validString, trigger: 'change', max: 200 }],
    str100: [{ required: false, validator: validString, trigger: 'change', max: 100 }],
    strRequired100: [{ required: true, validator: validString, trigger: 'change', max: 100 }],
    str50: [{ required: false, validator: validString, trigger: 'change', max: 50 }],
    strRequired50: [{ required: true, validator: validString, trigger: 'change', max: 50 }],
    str40: [{ required: false, validator: validString, trigger: 'change', max: 40 }],
    strRequired40: [{ required: true, validator: validString, trigger: 'change', max: 40 }],
    str30: [{ required: false, validator: validString, trigger: 'change', max: 30 }],
    strRequired30: [{ required: true, validator: validString, trigger: 'change', max: 30 }],
    strRequired20: [{ required: true, validator: validString, trigger: 'change', max: 20 }],
    str20: [{ required: false, validator: validString, trigger: 'change', max: 20 }],
    strRequired18: [{ required: true, validator: validString, trigger: 'change', max: 18 }],
    str18: [{ required: false, validator: validString, trigger: 'change', max: 18 }],
    strRequired12: [{ required: true, validator: validString, trigger: 'change', max: 12 }],
    strRequired10: [{ required: true, validator: validString, trigger: 'change', max: 10 }],
    str10: [{ required: false, validator: validString, trigger: 'change', max: 10 }],
    strRequired7: [{ required: true, validator: validString, trigger: 'change', max: 7 }],
    strRequired8: [{ required: true, validator: validString, trigger: 'change', max: 8 }],
    str7: [{ required: false, validator: validString, trigger: 'change', max: 7 }],
    str8: [{ required: false, validator: validString, trigger: 'change', max: 8 }],
    strRequired5: [{ required: true, validator: validString, trigger: 'change', max: 5 }],
}
export default rules
