<template>
    <div class="search-wrap" style="overflow: hidden">
        <slot name="tabs"></slot>
        <el-form ref="formRef" :model="params" :label-position="!!formOpt.inline ? 'left' : 'top'" :inline="!!formOpt.inline" @submit.native.prevent>
            <!-- 高级搜索 -->
            <template v-if="showAdvancedSearch">
                <el-form-item :prop="_props.formOpt.searchParams">
                    <div class="advancedSearch-wrap">
                        <el-input
                            class="advancedSearch-input"
                            @input="handleInput($event, _props.formOpt.searchParams)"
                            v-model="params[_props.formOpt.searchParams || 'keyWord']"
                            :placeholder="formOpt.vaguePlaceholder || '请输入'"
                            clearable
                        />
                        <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
                        <el-button v-if="!formOpt.hideReset" :icon="Refresh" @click="handleReset">重置</el-button>
                        <el-button link type="primary" @click="hanleDvancedSearch">
                            高级搜索<el-icon class="ArrowDown">
                                <ArrowDown />
                            </el-icon>
                        </el-button>
                        <slot name="colProp"></slot>
                        <span class="btn-right flex-wrap-right">
                            <slot name="right"></slot>
                        </span>
                    </div>
                </el-form-item>
            </template>
            <!-- 普通搜索 -->
            <template v-else>
                <el-row class="condition-row" :gutter="32">
                    <el-col
                        v-for="(condition, index) in formOpt.conditions"
                        v-show="!!condition.autoVisible"
                        :key="index"
                        :sm="condition.sm ? condition.sm : !!formOpt.inline ? 12 : 12"
                        :md="condition.md ? condition.md : !!formOpt.inline ? 12 : 8"
                        :lg="condition.lg ? condition.lg : !!formOpt.inline ? 8 : 6"
                        :xl="condition.xl ? condition.xl : !!formOpt.inline ? 6 : 4"
                    >
                        <el-form-item v-show="!!condition.autoVisible" :prop="condition.prop" :label="condition.label" style="width: 100%">
                            <el-input
                                v-if="condition.itemType === 'input' || condition.itemType === undefined"
                                v-model="params[condition.prop]"
                                @input="handleInput($event, condition.prop)"
                                :placeholder="condition.placeholder || '请输入'"
                                :clearable="condition.hasOwnProperty('clearable') ? condition.clearable : true"
                            />
                            <el-select
                                style="width: 100%"
                                filterable
                                v-else-if="condition.itemType === 'select'"
                                v-model="params[condition.prop]"
                                :value-key="`key${index}`"
                                :clearable="condition.hasOwnProperty('clearable') ? condition.clearable : true"
                                :multiple="!!condition.multiple"
                                :collapse-tags="!!condition.isCollapse"
                                :placeholder="condition.placeholder || '请选择'"
                            >
                                <el-option
                                    v-for="(option, optionIndex) in condition.options"
                                    :key="optionIndex + '_local'"
                                    :value="typeof option === 'object' ? option[condition.valueKey || 'value'] : option"
                                    :label="typeof option === 'object' ? option[condition.labelKey || 'label'] : option"
                                />
                            </el-select>
                            <el-cascader
                                style="width: 100%"
                                :ref="`cascader${index}`"
                                v-else-if="condition.itemType === 'cascader'"
                                v-model="params[condition.prop]"
                                :clearable="condition.hasOwnProperty('clearable') ? condition.clearable : true"
                                :show-all-levels="!!condition.showAll"
                                :options="condition.options"
                                :placeholder="condition.placeholder || '请选择'"
                                :props="Object.assign({ expandTrigger: 'hover' }, condition.props)"
                                :collapse-tags="condition.collapseTags || true"
                                @change="
                                    el => {
                                        handleCascader(el, index, condition)
                                    }
                                "
                            ></el-cascader>
                            <el-cascader
                                style="width: 100%"
                                :ref="`cascader${index}`"
                                v-else-if="condition.itemType === 'cascader2'"
                                v-model="params[condition.prop]"
                                :clearable="condition.hasOwnProperty('clearable') ? condition.clearable : true"
                                :show-all-levels="!!condition.showAll"
                                :options="condition.options"
                                :placeholder="condition.placeholder || '请选择'"
                                :props="{ ...condition.props, expandTrigger: 'hover' }"
                                :collapse-tags="condition.collapseTags || true"
                                @change="
                                    el => {
                                        handleCascader2(el, index, condition)
                                    }
                                "
                            ></el-cascader>
                            <el-date-picker
                                @change="handleDate(params[condition.prop], condition)"
                                v-else-if="condition.itemType === 'daterange'"
                                v-model="params[condition.prop]"
                                style="width: 100%"
                                value-format="YYYY-MM-DD"
                                type="daterange"
                                range-separator="-"
                                :start-placeholder="(condition.placeholder && condition.placeholder[0]) || '请选择'"
                                :end-placeholder="(condition.placeholder && condition.placeholder[1]) || '请选择'"
                            />
                        </el-form-item>
                    </el-col>

                    <div :class="!!formOpt.inline ? 'inline' : 'noInline'">
                        <div>
                            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
                            <el-button v-if="!formOpt.hideReset" :icon="Refresh" @click="handleReset">重置</el-button>
                            <el-button link type="primary" @click="hanleDvancedSearch" v-if="!!formOpt.advancedSearch">
                                高级搜索<el-icon class="ArrowUp">
                                    <ArrowUp />
                                </el-icon>
                            </el-button>
                            <slot name="colProp"></slot>
                            <slot name="left"></slot>
                        </div>
                        <div class="btn-right flex-wrap-right">
                            <slot name="right"></slot>
                        </div>
                    </div>
                </el-row>
            </template>
        </el-form>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, getCurrentInstance, computed, toRef } from 'vue'
import { Search, Refresh, ArrowDown } from '@element-plus/icons-vue'
const { appContext, proxy } = getCurrentInstance()
const { utils } = appContext.config.globalProperties

defineOptions({
    name: 'search-bar',
})

const emit = defineEmits(['search', 'draftCb'])

/**
 * 创建表单ref
 */
const formRef = $ref()

const props = defineProps({
    formOpt: {
        type: Object,
        default: {},
    },
})

let _props = $ref(props)
let params = $ref({})

let showAdvancedSearch = $ref(false) // 高级搜索时显示高级搜索:true / 一般搜索:false

watch(props, (newQuestion, oldQuestion) => {
    if (newQuestion.formOpt.advancedSearch) {
        // 高级搜索
        showAdvancedSearch = true
        params = {}
        params[newQuestion.formOpt.searchParams || 'keyWord'] = null
    } else {
        configParams(newQuestion.formOpt.conditions)
    }
})

/**
 * emit出去的data
 */
const emitData = $ref(
    computed(() => {
        let data = utils.copy(params)
        if (!showAdvancedSearch) {
            _props.formOpt.conditions.map(item => {
                if (!utils.isEmpty(data[item.prop]) && item.propLabel && item.propLabel.length) {
                    item.propLabel.map((_item, index) => {
                        data[_item] = data[item.prop][index]
                    })
                    delete data[item.prop]
                }
            })
            for (let key in data) {
                if (utils.isEmpty(data[key])) delete data[key]
            }
        }

        return data
    })
)

/**
 * 处理联级选择器数据
 */
const handleCascader = (value, index, condition) => {
    // 是否返回叶子节点数据
    if (!!condition.leafOnly) {
        let nodes = proxy.$refs[`cascader${index}`][0].getCheckedNodes(false)
        let arr = []
        for (let i = 0; i < nodes.length; i++) {
            arr.push(nodes[i].value)
        }
        params[condition.prop] = arr
    }
}

/**
 * 处理联级选择器数据
 */
const handleCascader2 = (value, index, condition) => {
    let nodes = proxy.$refs[`cascader${index}`][0].getCheckedNodes(false)
    params[condition.prop] = nodes.map(item => item.value)
}

/**
 * 处理input去除前后空格
 */
const handleInput = (e, prop) => {
    params[prop || 'keyWord'] = e.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 日期选择器处理
 */
const handleDate = (e, condition) => {
    if (e) {
        params[condition.propLabel[0]] = e[0]
        params[condition.propLabel[1]] = e[1]
    } else {
        params[condition.propLabel[0]] = null
        params[condition.propLabel[1]] = null
    }
}

/**
 * 搜索
 */
const handleSearch = (params = {}) => {
    // const data = utils.copy(params)
    emit('search', { ...emitData, ...params })
    getAcceptCount()
}

/**
 * 重置
 */
const handleReset = () => {
    if (!formRef) return
    formRef.resetFields()
    if (showAdvancedSearch) {
        params[_props.formOpt.searchParams || 'keyWord'] = null
    }
    _props.formOpt.conditions.map(item => {
        if (item.propLabel && item.propLabel.length) {
            item.propLabel.map(_item => (params[_item] = null))
        }
    })
    // const data = utils.copy(params)
    // emit('search', emitData)
    handleSearch()
}

/**
 * 切换高级搜索和一般搜索
 */
const hanleDvancedSearch = () => {
    showAdvancedSearch = !showAdvancedSearch

    params = {}
    if (showAdvancedSearch) {
        params[_props.formOpt.searchParams || 'keyWord'] = null
    } else {
        configParams(_props.formOpt.conditions)
    }

    handleSearch()
}

// 切换高级搜索（用于父组件）
const hanleDvancedSearchParent = () => {
    showAdvancedSearch = false

    params = {}
    if (showAdvancedSearch) {
        params[_props.formOpt.searchParams || 'keyWord'] = null
    } else {
        configParams(_props.formOpt.conditions)
    }

    handleSearch()
}

/**
 * 设置初始值
 */
const configParams = configs => {
    let _configs = utils.copy(configs)
    if (Array.isArray(configs)) {
        configs.forEach((config, i) => {
            const propType = typeof config.prop

            if (propType === 'string') {
                params[config.prop] = config.defaultValue ? config.defaultValue : ''
                if (config.itemType === 'daterange') {
                    params[config.propLabel[0]] = config.defaultValue ? config.defaultValue[0] : ''
                    params[config.propLabel[1]] = config.defaultValue ? config.defaultValue[1] : ''
                }
            } else if (Array.isArray(config.prop)) {
            }
        })
    }
}

onMounted(() => {
    if (_props.formOpt.advancedSearch) {
        // 高级搜索
        showAdvancedSearch = true
        params = {}
        params[_props.formOpt.searchParams || 'keyWord'] = null
    } else {
        configParams(_props.formOpt.conditions)
    }
})

defineExpose({
    hanleDvancedSearchParent,
    handleReset,
})
</script>

<style scoped lang="scss">
.search-wrap {
    margin-bottom: 16px;
}

.flex-wrap-right {
    display: flex;
    justify-content: flex-end;
}

.advancedSearch-wrap {
    display: flex;
    justify-content: flex-start;

    .advancedSearch-input {
        margin-right: 12px;
        width: 360px;
    }

    .btn-right {
        position: absolute;
        right: 16px;
    }
}

.noInline {
    padding: 0px 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.inline {
    padding: 0px 16px;

    .btn-right {
        position: absolute;
        right: 16px;
        top: 0;
    }
}

:deep(.el-form-item__label) {
    min-height: 22px;
}
</style>
