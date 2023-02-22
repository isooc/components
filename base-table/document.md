# 示例

```javascript
<lz-dynamic-table :headData="headData" :tableData="tableData" @sortChange="handleSortChange" @pagination="getPagination" v-model:page="pagination.page" v-model:size="pagination.size" :total="pagination.total">
    <template #operate="scope">
        <el-button link type="primary" @click="handleEdit(scope)">编辑</el-button>
        <el-button link type="primary" @click="handleDelete(scope)">删除</el-button>
        <el-button link type="primary" @click="handleDetail(scope)">详情</el-button>
    </template>
</lz-dynamic-table>

<script setup>
let pagination = $ref({
    page: 1,
    size: 10,
    total: 100,
})

const getPagination = data => {
    console.log('list', data)
    pagination.page = data.currentPage
    pagination.size = data.pageSize
    getList()
}

let handleSortChange = sortData => {
  console.log('sortData', sortData)
}
</script>
```

# 属性

| 属性      | 说明                       | 类型          | 可选值 | 默认值            |
| --------- | -------------------------- | ------------- | ------ | ----------------- |
| headData  | 表头配置                   | array         |        |                   |
| tableData | 表格内容配置               | array         |        |                   |
| sizesArr  | 分页配置, 每页多少条配置项 | array         |        | [10, 20, 50, 100] |
| total     | 分页配置,列表总数          | number/string |        | 100               |
| page      | 分页配置,当前页码          | number/string |        | 1                 |
| size      | 分页配置,当前每页条数      | number/string |        | 10                |

# headData

| 属性         | 说明                                          | 类型     | 可选值                                 | 默认值             |
| ------------ | --------------------------------------------- | -------- | -------------------------------------- | ------------------ |
| label        | 表头名称                                      | string   |                                        |                    |
| prop         | 表头字段                                      | string   |                                        |                    |
| check        | 是否显示                                      | booblean | true/false                             | false              |
| minWidth     | 最小宽度                                      |
|              |
|              |
| width        | 固定宽度                                      |          |                                        |                    |
| sortable     | 排序, 配合方法 sortChange                     |          |                                        |                    |
| type         | 类型                                          | string   | money/date/dateTime/router 和插槽 name | 默认不传为普通文本 |
| routerId     | type 为 router 时, 需要跳转路由 id 参数字段名 | string   |                                        | 10                 |
| routerName   | type 为 router 时, 需要跳转路由名称           |          |                                        |                    |
| routerParams | type 为 router 时, 需要跳转路由其他参数       |          |                                        |                    |

# 事件

| 事件名     | 说明                   | 回调参数                |
| ---------- | ---------------------- | ----------------------- |
| sortChange | 排序回调               | column                  |
| pagination | 翻页和调整每页数量回调 | {currentPage, pageSize} |
