<template>
    <div>
        <el-table
            header-cell-class-name="table-head-row"
            @header-dragend="handleDragend"
            resizable
            size="small"
            :border="border"
            :key="tableKey"
            fit
            @sort-change="handleSortChange"
            :data="props.tableData"
            style="width: 100%"
            row-key="id"
        >
            <template v-for="(item, index) in props.headData" :key="`col_${index}`">
                <el-table-column
                    v-if="item.check"
                    :prop="Array.isArray(item.prop) ? 'name' : item.prop"
                    :width="item.width"
                    :fixed="item.fixed ? item.fixed : item.type === 'operate' ? 'right' : false"
                    :min-width="item.minWidth"
                    :sortable="item.sortable ? '' : false"
                    :label="item.label"
                    :header-align="item.headerAlign ? item.headerAlign : 'left'"
                >
                    <template #header>
                        {{ item.label }}
                        <el-tooltip v-if="item.tooltip" effect="dark" :content="item.tooltip" placement="top">
                            <el-icon><QuestionFilled /></el-icon>
                        </el-tooltip>
                    </template>
                    <template #default="scope">
                        <!-- 格式化金额 -->
                        <template v-if="item.type === 'money'">
                            {{ filters.moneyFormat(scope.row[item.prop]) }}
                        </template>
                        <!-- 格式化金额 -->
                        <template v-else-if="item.type === 'index'">
                            {{ scope.$index + 1 }}
                        </template>
                        <!-- 格式化金额 空值处理，不转化为0.00 -->
                        <template v-else-if="item.type === 'moneyHas'">
                            {{ utils.isEmpty(scope.row[item.prop]) ? '-' : filters.moneyFormat(scope.row[item.prop]) }}
                        </template>
                        <!-- 格式化日期 -->
                        <template v-else-if="item.type === 'date'">
                            <span v-if="Array.isArray(item.prop)">
                                {{ filters.dateFormat(scope.row[item.prop[0]], item.format || 'YYYY-MM-DD') }}
                                <template v-if="scope.row[item.prop[1]]"> ~ {{ filters.dateFormat(scope.row[item.prop[1]], item.format || 'YYYY-MM-DD') }}</template>
                            </span>
                            <span v-else>{{ filters.dateFormat(scope.row[item.prop], item.format || 'YYYY-MM-DD') }}</span>
                        </template>
                        <!-- 格式化时间 -->
                        <template v-else-if="item.type === 'dateTime'">
                            {{ filters.dateTimeFormat(scope.row[item.prop]) }}
                        </template>
                        <!-- 格式化二级数据 如工程/消防工程 -->
                        <template v-else-if="item.type === 'level'">
                            <span v-if="Array.isArray(item.prop)">
                                {{ scope.row[item.prop[0]] }}<template v-if="scope.row[item.prop[1]]">/{{ scope.row[item.prop[1]] }}</template>
                            </span>
                            <span v-else>{{ scope.row[item.prop] }}</span>
                        </template>
                        <!-- 展示二级对象嵌套数据 如合同 -> 合同编号 -->
                        <template v-else-if="item.type === 'nest'">
                            <span v-if="Array.isArray(item.prop)">
                                {{ scope.row[item.prop[0]][item.prop[1]] }}
                            </span>
                            <span v-else>{{ scope.row[item.prop] }}</span>
                        </template>
                        <!-- 路由跳转  需要 routerName, routerId, routerParams -->
                        <template v-else-if="item.type === 'router'">
                            <a class="href" @click="handleRouter(item, scope.row)">{{ scope.row[item.prop] }}</a>
                        </template>
                        <!-- 审批状态 -->
                        <!-- <template v-else-if="item.type === 'approve' && scope.row[item.prop] "> -->
                        <template v-else-if="item.type === 'approve' && (scope.row[item.prop] || scope.row[item.prop] === 0)">
                            <span :style="`color:${handleArray(scope.row[item.prop], constant.APPROVE_STATUS).color};`">
                                {{ handleArray(scope.row[item.prop], constant.APPROVE_STATUS).label }}
                            </span>
                        </template>
                        <!-- 维护状态 -->
                        <template v-else-if="item.type === 'maintain' && scope.row[item.prop]">
                            <span :style="`color:${handleArray(scope.row[item.prop], constant.MAINTAIN_STATUS).color};`">
                                {{ handleArray(scope.row[item.prop], constant.MAINTAIN_STATUS).label }}
                            </span>
                        </template>
                        <!-- 数组 -->
                        <template v-else-if="item.type === 'array'">
                            <span v-if="scope.row[item.prop] || scope.row[item.prop] === 0" :style="`color:${handleArray(scope.row[item.prop], item.array).color || '#000000'};`">
                                {{ handleArray(scope.row[item.prop], item.array).label }}
                            </span>
                            <span v-else> - </span>
                        </template>
                        <template v-else-if="item.type === 'file'">
                            <div v-for="_file in getFileList(scope.row[item.prop])" :key="_file.name">
                                <span class="href" @click="handleOpenFile(_file.url)">{{ _file.name }}</span>
                            </div>
                        </template>
                        <!-- 插槽, 注意要写 :row="scope.row" :index="scope.$index", 其他逻辑在业务页面完成 -->
                        <!-- 操作 -->
                        <template v-else-if="item.type === 'operate'">
                            <slot name="operate" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 开关状态 -->
                        <template v-else-if="item.type === 'switch'">
                            <slot name="switch" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 插槽1 -->
                        <template v-else-if="item.type === 'slot1'">
                            <slot name="slot1" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 插槽2 -->
                        <template v-else-if="item.type === 'slot2'">
                            <slot name="slot2" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 插槽render  renderName为指定的插槽名字 -->
                        <template v-else-if="item.type === 'render'">
                            <slot :name="item.renderName" :row="scope.row" :index="scope.$index"></slot>
                        </template>
                        <!-- 多级表头 -->
                        <template v-else-if="item.type === 'subColumn'">=
                            <el-table-column
                                v-for="(vItem, vIndex) in item.subHeadData"
                                :width="vItem.width"
                                :min-width="vItem.minWidth"
                                :prop="vItem.prop"
                                :label="vItem.label"
                                :sortable="vItem.sortable ? '' : false"
                            >
                                <template #default="scope">
                                    <div v-if="vItem.type === 'moneyHas'">{{ utils.isEmpty(scope.row[vItem.prop]) ? '-' : filters.moneyFormat(scope.row[vItem.prop]) }}</div>
                                    <template v-else-if="vItem.type === 'money'">
                                        {{ filters.moneyFormat(scope.row[vItem.prop]) }}
                                    </template>
                                    <template v-else-if="vItem.type === 'array'">
                                        <span v-if="scope.row[vItem.prop] || scope.row[vItem.prop] === 0" :style="`color:${handleArray(scope.row[vItem.prop], vItem.array).color || '#000000'};`">
                                            {{ handleArray(scope.row[vItem.prop], vItem.array).label }}
                                        </span>
                                        <span v-else> - </span>
                                    </template>
                                    <template v-else-if="vItem.type === 'subSlot1'">
                                        <slot name="subSlot1" :row="scope.row" :index="scope.$index"> </slot>
                                    </template>
                                    <template v-else-if="vItem.type === 'subSlot2'">
                                        <slot name="subSlot2" :row="scope.row" :index="scope.$index"> </slot>
                                    </template>
                                    <template v-else-if="vItem.type === 'subSlot3'">
                                        <slot name="subSlot3" :row="scope.row" :index="scope.$index"> </slot>
                                    </template>
                                    <template v-else>
                                        {{ utils.isEmpty(scope.row[vItem.prop]) ? '-' : scope.row[vItem.prop] }}
                                    </template>
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 默认 -->
                        <template v-else>
                            {{ utils.isEmpty(scope.row[item.prop]) ? '-' : scope.row[item.prop] }}
                        </template>
                    </template>
                </el-table-column>
            </template>
            <template #empty>
                <div>暂无数据</div>
            </template>
        </el-table>
        <div class="pagination-wrap" v-if="props.showPagination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="props.sizesArr"
                background
                :layout="props.layout"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, getCurrentInstance, computed } from 'vue'
import Sortable from 'sortablejs'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'base-table',
})

const { appContext } = getCurrentInstance()
const { utils, filters, constant, $Request } = appContext.config.globalProperties
// utils, filters 来自全局引入的utils文件夹
const emit = defineEmits(['sortChange', 'pagination', 'update:size', 'update:page'])

const props = defineProps({
    headData: {
        type: Array,
        default: [],
    },
    tableData: {
        type: Array,
        default: [],
    },
    sizesArr: {
        type: Array,
        default: [5, 10, 20, 50, 100],
    },
    total: {
        type: [Number, String],
        default: 0,
    },
    page: {
        type: [Number, String],
        default: 1,
    },
    size: {
        type: [Number, String],
        default: 10,
    },
    // 是否显示分页
    showPagination: {
        type: Boolean,
        default: true,
    },
    layout: {
        type: String,
        default: 'sizes, prev, pager, next, jumper, total',
    },
    // 是否是草稿列表; 0-不是草稿, 1-是草稿
    isDraft: {
        type: String,
        default: '0',
    },
    type: {
        type: String,
    },
})

let tableKey = $ref(new Date().getTime()) // 表格key, 用于重新渲染表格

let sortable = $ref() // 拖拽

/**
 * 拖拽初始化
 */
let columnDrop = () => {
    const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
    sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
            const oldItem = props.headData[evt.oldIndex]
            props.headData.splice(evt.oldIndex, 1)
            props.headData.splice(evt.newIndex, 0, oldItem)
            //   handleDropCb()
        },
    })
}

/**
 * 拖拽回调
 * 重新渲染表格
 */
const handleDropCb = () => {
    tableKey = new Date().getTime()
    setTimeout(() => {
        columnDrop()
    }, 200)
}

const handleArray = (row, arr) => {
    return arr.find(item => item.value === row) || {}
}

/**
 * 排序
 */
const handleSortChange = (column, prop, order) => {
    emit('sortChange', column)
}

/**
 * 路由跳转
 */
const router = useRouter()
const handleRouter = (item, data) => {
    router.push({ name: item.routerName, query: { id: data[item.routerId], ...item.routerParams } })
}

/**
 * 拖拽宽度
 */
const handleDragend = (newWidth, oldWidth, column, event) => {}

watch(props, async (newQuestion, oldQuestion) => {
    currentPage = newQuestion.page
    pageSize = newQuestion.size
    total = newQuestion.total
})

/**
 * 分页
 */
let currentPage = $ref(props.page)
let pageSize = $ref(props.size)
let total = $ref(props.total)

const handleSizeChange = val => {
    emit('pagination', { currentPage: currentPage, pageSize: val })
}

const handleCurrentChange = val => {
    emit('pagination', { currentPage: val, pageSize: pageSize })
}

const handleOpenFile = url => {
    let temp = window.open(url)
    temp.location = url
}

const getFileList = row => {
    if (utils.isEmpty(row)) return []
    return Array.isArray(row) ? row : JSON.parse(row)
}

onMounted(() => {
    //   columnDrop()
})
</script>

<style scoped lang="scss">
.pagination-wrap {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
}

:deep(.table-head-row) {
    background: #f5f7fa !important;
}
</style>
