import { ElForm } from 'element-plus'
import { showMessage } from './index'
const method = ElForm.emits.validate
ElForm.emits.validate = (prop, isValid, message2) => {
    method(prop, isValid, message2)
    try {
        console.log(prop, isValid, message2)
        if (isValid) return true
        let btns = document.querySelectorAll('.el-button--primary')
        let hasBtnHover = Array.from(btns).some(btn => btn.matches(btn.tagName + ':hover'))
        console.log(hasBtnHover)
        if (!isValid && hasBtnHover) {
            showMessage()
            localStorage.removeItem('isNoValid')
        } else if (!isValid) {
            localStorage.setItem('isNoValid', '1')
            setTimeout(() => {
                localStorage.removeItem('isNoValid')
            }, 1000)
        }
    } catch (e) {
        console.log(e)
    }
    return true
}