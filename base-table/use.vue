<template>
    <div v-loading="loading" class="fund-page">
        <search-bar :formOpt="formOpt" @search="handleSearch">
            <template #right>
                
            </template>
        </search-bar>

        <base-table
            :headData="headData"
            :tableData="tableData"
            @pagination="getPagination"
            v-model:page="pagination.page"
            v-model:size="pagination.size"
            :total="pagination.total"
        >
            <template #switch="scope">
                {{ scope.error }}
            </template>
            <template #operate="scope">
                <template>
                    <el-button type="primary" link @click="handleDetail(scope.row)">详情</el-button>
                </template>
            </template>
        </base-table>
    </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import searchBar from '../search-bar/index.vue'
import baseTable from './index.vue'

defineOptions({
  name: 'basetable-use',
})

const router = useRouter()
let loading = $ref(false)

const { appContext } = getCurrentInstance()
const { utils, rules, $Request, $confirm, $message, constant } = appContext.config.globalProperties

const formOpt = $ref({
  advancedSearch: true,
  searchParams: 'searchKey',
  conditions: [
    {
      prop: 'input',
      label: '文本',
      placeholder: '请输入内容',
      autoVisible: true,
    },
    {
      prop: 'select',
      label: '下拉选择',
      placeholder: '请选择',
      itemType: 'select',
      options: [],
      autoVisible: true,
    },
  ]
})

/**
 * 搜索
 */
let search = $ref({})
const handleSearch = params => {
  search = params
  pagination.page = 1
  getList()
}

let tableData = $ref()
let headData = $ref([
  {
    label: '序号',
    check: true,
    type: 'index',
    width: '70',
  },
  {
    label: '编号',
    prop: 'bizNo',
    check: true,
    minWidth: '160',
  },
  {
    label: '日期',
    prop: 'createdTime',
    type: 'date',
    check: true,
    width: '120',
  },
  {
    label: '类型',
    prop: 'bizType',
    type: 'array',
    array: [],
    check: true,
    minWidth: '90',
  },
  {
    label: '金额',
    prop: 'frozenAmount',
    type: 'money',
    check: true,
    minWidth: '98',
  },
  {
    label: '操作',
    check: true,
    width: '100',
    type: 'operate',
  },
])

/**
 * 获取列表 frozenDirect: 0冻结 1解冻
 */
const getList = () => {
  loading = true
  // 接口
  $Request.api
    .apiName({ ...search, pageNo: pagination.page, pageSize: pagination.size })
    .then(res => {
      loading = false
      tableData = res.data.list
      pagination.page = res.data.currentPage
      pagination.size = res.data.pageSize
      pagination.total = res.data.total
    })
    .catch(error => (loading = false))
}

/**
 * 分页
 */
let pagination = $ref({
  page: 1,
  size: 10,
  total: 0,
})

const getPagination = data => {
  pagination.page = data.currentPage
  pagination.size = data.pageSize
  getList()
}

const handleDetail = data => {
}

onMounted(async () => {
  await getList()
})
</script>