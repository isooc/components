<template>
    <el-select
        v-model="selectData"
        placeholder="请选择"
        clearable
        style="width: 100%"
        :multiple="_props.multiple"
        :persistent="_props.persistent"
        filterable
        remote
        :allow-create="_props.allowCreate"
        :disabled="_props.disabled"
        @focus="handleFocus"
        @clear="handleClear"
        @change="handleChange"
        @visible-change="handleVisible"
        :remote-method="handleRemote"
    >
        <div :style="`width: ${_props.width}`">
            <div class="select-box"></div>
            <el-row class="select-title">
                <el-col v-for="(item, index) in options.title" :key="index" :span="span" class="select-title-item">{{ item.label }}</el-col>
            </el-row>
            <el-option
                class="select-option"
                v-for="item in options.data"
                :key="item[_props.prop.value]"
                :label="_props.prop.labelFormatter ? _props.prop.labelFormatter(item) : item[_props.prop.label]"
                :value="item[_props.prop.value]"
            >
                <el-row>
                    <el-col v-for="(titleItem, titleIndex) in options.title" :key="titleIndex" :span="span" class="select-option-item">
                        <template v-if="titleItem.type === 'date'">{{ filters.dateFormat(item[titleItem.value], titleItem.format || 'YYYY-MM-DD') || '-' }}</template>
                        <template v-else-if="titleItem.type === 'array'">
                            <span v-if="item[titleItem.value] || item[titleItem.value] === 0">
                                {{ handleArray(item[titleItem.value], titleItem.array).label }}
                            </span>
                            <span v-else> - </span>
                        </template>
                        <template v-else>{{ utils.isEmpty(item[titleItem.value]) ? '-' : item[titleItem.value] }}</template>
                    </el-col>
                </el-row>
            </el-option>
            <el-option v-if="!options.data || options.data.length === 0" disabled> 无数据 </el-option>
            <div class="select-btn-wrap" v-if="_props.showBtn">
                <div class="select-box"></div>
                <el-button class="select-btn" @click="handleBtnClick">{{ _props.btnText }}</el-button>
            </div>
            <div class="pagination-wrap">
                <div class="select-box36"></div>
                <div class="pagination-item">
                    <el-pagination
                        layout="prev, pager, next, total"
                        v-model:current-page="pagination.page"
                        v-model:page-size="pagination.size"
                        :pager-count="5"
                        :total="pagination.total"
                        @current-change="handleCurrent"
                    />
                </div>
            </div>
        </div>
    </el-select>
</template>
<script setup>
import { ref, onMounted, watch, getCurrentInstance, computed } from 'vue'
import config from './config.js'

defineOptions({
  name: 'lz-select-new',
})

const { appContext } = getCurrentInstance()
const { utils, filters, $Request } = appContext.config.globalProperties
const emit = defineEmits(['update:data', 'btnCb', 'changeCb', 'handleFocus'])

const props = defineProps({
  // 回显时显示label
  showLabel: {
    type: Object,
    default: {},
  },
  prop: {
    type: Object,
    default: {
      value: 'value',
      label: 'label',
    },
  },
  searchParams: {
    type: String,
    default: 'keyWord'
  },
  // 选中值v-model
  data: {
    type: [Array, String],
    default: null,
  },
  // 接口传参
  params: {
    type: Object,
    default: {},
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可创建
  allowCreate: {
    type: Boolean,
    default: false,
  },
  // 是否显示按钮
  showBtn: {
    type: Boolean,
    default: false,
  },
  // 下拉框的宽度是否与输入框相同
  width: {
    type: String,
    default: 'auto',
  },
  // 按钮文字
  btnText: {
    type: String,
    default: '新增',
  },
  type: {
    type: String,
    default: 'contract',
  },
  setKey: {
    type: Array,
    default: () => []
  }
})

watch(props, (newQuestion, oldQuestion) => {
  _props = newQuestion
  selectData = _props.data
})

// 参数改变
watch(
  () => props.params,
  async (newQuestion, oldQuestion) => {
    getList()
  },
  { immediate: false, deep: true }
)

// 计算布局
let span = computed(() => {
  let num = 24
  switch (options.title.length) {
    case 1:
      num = 24
      break
    case 2:
      num = 12
      break
    case 3:
      num = 8
      break
    case 4:
      num = 6
      break
    default:
      break
  }
  return num
})

let selectData = $ref(null)

let loading = $ref(false)
let loadingText = `加载中,请稍后`

let _props = $ref({})

let query = $ref()

let options = $ref({
  title: [
    // {
    //     label: '项目名称',
    //     value: 'projectName',
    // },
  ],
  data: [],
})

/**
 * 分页
 */
let pagination = $ref({
  page: 1,
  size: 5,
  total: 0,
})

// 处理初始化数据
const handleInitData = data => {
  let obj = data.find(item => item[_props.prop.value] === _props.data)
  let arr = data
  if (obj) {
    return arr
  } else {
    if (_props.showLabel && _props.showLabel[_props.prop.value]) {
      arr.unshift(_props.showLabel)
    }
    return arr
  }
}

const handleArray = (row, arr) => {
  return arr.find(item => item.value === row) || {}
}

/**
 * 获取列表
 */
const getList = str => {
  let params = {
    ..._props.params,
    pageNo: pagination.page,
    pageSize: pagination.size,
    [_props.searchParams]: query && query.length > 0 ? query : null,
  }
  loading = true
  let apiArr = config[_props.type].api.split('.')
  $Request[apiArr[0]]
  [apiArr[1]](params)
    .then(res => {
      loading = false
      pagination.total = res.data.total
      options.title = config[_props.type].title

      if (_props.setKey?.length) {
        // 添加唯一key值ids
        res.data.list.map(el => {
          el.ids = ''
          _props.setKey.forEach(key => {
            el.ids += el[key]
          })
          return el
        })
      }

      if (str === 'init') {
        options.data = handleInitData(res.data.list)
      } else {
        options.data = res.data.list
      }

      // 返回空数组时显示
      // if (options.data.length === 0) {
      //     options.data.push({
      //         [_props.prop.value]: 1
      //     })
      // }
    })
    .catch(error => {
      loading = false
    })
}

/**
 * 搜索
 */
const handleRemote = str => {
  initData()
  query = str
  options.data = []
  getList('scroll')
}

// 失去焦点
const handleVisible = e => {
  if (!e) {
    initData()
    getList()
  }
}

/**
 * 选中
 */
const handleChange = e => {
  emit('update:data', e)
  let obj = options.data.find(item => item[_props.prop.value] === e)
  emit('changeCb', obj, e)
}

/**
 * 按钮点击
 */
const handleBtnClick = () => {
  emit('btnCb', true)
}

/**
 * 清除
 */
const handleClear = () => {
  initData()
  getList()
}

const handleFocus = () => {
  emit('handleFocus')
}
/**
 * 初始化数据
 */
const initData = () => {
  pagination.page = 1
  query = null
}

/**
 * 分页
 */
const handleCurrent = page => {
  pagination.page = page
  getList()
}

onMounted(() => {
  _props = props
  selectData = _props.data
  getList('init')
})

defineExpose({
  handleClear,
})
</script>

<style scoped lang="scss">
.select-box {
    width: 100px;
    height: 32px;
}
.select-box36 {
    width: 100px;
    height: 36px;
}
.select-title {
    position: absolute;
    top: 0px;
    z-index: 999;
    // display: flex;
    // align-items: center;
    padding: 0px 32px 0px 20px;
    background: #ebeef5;
    font-weight: bold;
    height: 32px;
    width: 100%;
    .select-title-item {
        height: 32px;
        display: flex;
        align-items: center;
    }
}
.select-option {
    .select-option-item {
        white-space: normal;
    }
}
.select-btn-wrap {
    padding: 0px 32px 0px 20px;
    .select-btn {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 36px;
        z-index: 999;
        width: 100%;
    }
}
.el-select-dropdown__item {
    height: auto !important;
}

.pagination-wrap {
    background: #ffffff;
    padding: 0px 32px 0px 20px;
    .pagination-item {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 990;
        width: 100%;
        background: #ffffff;
    }
}
</style>
<style lang="scss">
.el-select-dropdown__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px !important;
    font-size: 20px;
}
</style>
