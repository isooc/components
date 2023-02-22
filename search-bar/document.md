# 示例
```javascript
formOpt = {
    advancedSearch: false, // 是否使用高级搜索 默认false
    searchParams: 'keyword', // 高级搜索参数,默认keyword
    vaguePlaceholder: '请输入完整的项目编号或其他关键字进行搜索',   // 默认:请输入
    inline: true, // 是否行内表单 默认false
    conditions: [
        // 输入框
        {
            prop: 'transferNo',
            label: '申请编号',
            placeholder: '请输入申请编号',  // 默认:请输入
            autoVisible: true,  // 是否显示
            defaultValue: '123123',
            sm: 12,
            md: 8,
            lg: 6,
            xl: 4,  // 默认不传, 单数设置时, inline传12,12,8,6, 否则传12,8,6,4
        },
        // 下拉选择
        {
            prop: 'transferType111',
            label: '调拨类型',
            placeholder: '请选择', // 默认:请选择
            autoVisible: true,
            itemType: 'select',
            multiple: true,
            options: [],
            valueKey: 'deptId',
            labelKey: 'deptName',
            //   defaultValue: [111, 222],
        },
        // 选择任意一级单选
        {
            prop: 'projClass',
            showAll: true, // 输入框中是否显示选中值的完整路径
            label: '项目分类',
            placeholder: '请选择项目分类', // 默认:请选择
            autoVisible: true,
            itemType: 'cascader',
            props: {
                value: 'deptId',
                label: 'deptName',
                children: 'subDeps',
                multiple: false, // 多选,默认false
                checkStrictly: true, // 父子节点不互相关联,默认false
            },
            options: [],
            defaultValue: ['1169460285935128578', '1295322228612825090'],
        },
        // 联级选择器多选
        {
            prop: 'projClass1',
            showAll: false, // 输入框中是否显示选中值的完整路径
            label: '部门',
            placeholder: '请选择项目分类', // 默认:请选择
            autoVisible: true,
            itemType: 'cascader',
            leafOnly: true, // 是返回示叶子节点数据
            props: {
                value: 'deptId',
                label: 'deptName',
                children: 'subDeps',
                multiple: true, // 多选,默认false
                checkStrictly: false, // 父子节点不互相关联,默认false
            },
            options: [],
            defaultValue: ['1295322228612825090', '1346651044876447746', '1411931844322050050'],
        },
        // 日期选择器
        {
            prop: 'contractSignedStartTime',
            propLabel: ['projectSuccessStartTime', 'projectSuccessEndTime'],
            label: '合同日期',
            placeholder: ['合同开始日期', '合同结束日期'], // 默认:请选择
            autoVisible: true,
            itemType: 'daterange',
            defaultValue: ['2020-11-11', '2021-11-02'],
        },
    ],
}
```
# 
# formOpt
| 属性             | 说明                | 类型    | 可选值     | 默认值  |
| ---------------- | ------------------- | ------- | ---------- | ------- |
| advancedSearch   | 是否显示高级搜索    | boolean | true/false | false   |
| searchParams     | 高级搜索参数        | string  |            | keyword |
| vaguePlaceholder | 高级搜索placeholder | string  |            | 请输入  |
| inline           | 是否行内表单        | boolean | true/false | false   |
| conditions       | 每个搜索条件配置项  | array   |            |         |


# conditions
| 属性         | 说明                                        | 类型          | 可选值                    | 默认值               |
| ------------ | ------------------------------------------- | ------------- | ------------------------- | -------------------- |
| prop         | 搜索参数字段名                              | string        |                           |                      |
| label        | 搜索名称                                    | string        |                           |                      |
| placeholder  | placeholder                                 | string        |                           | 请输入               |
| autoVisible  | 是否显示                                    | boolean       | true/false                | true                 |
| defaultValue | 默认值                                      | string/array/ |                           |                      |
| sm           | sm<1280                                     | number        |                           | inline传12, 否则传12 |
| md           | md≥1280                                     | number        |                           | inline传12, 否则传8  |
| lg           | lg≥1536                                     | number        |                           | inline传8, 否则传6   |
| xl           | xl≥1920                                     | number        |                           | inline传6, 否则传4   |
| itemType     | 搜索类型                                    | string        | select/cascader/daterange | 默认不传为输入框     |
| multiple     | itemType为select/cascader时, 是否可以多选   | boolean       | true/false                | false                |
| options      | itemType为select/cascader时, 传入的数据     | array         |                           |                      |
| valueKey     | itemType为select时指定value的字段名         | string        |                           | value                |
| labelKey     | itemType为select时指定label的字段名         | string        |                           | label                |
| props        | itemType为cascader时, 配置项                | object        |                           |                      |
| propLabel    | itemType为daterange时返回日期开始和结束字段 | array         |                           |                      |



# props
| 属性          | 说明                                    | 类型    | 可选值     | 默认值   |
| ------------- | --------------------------------------- | ------- | ---------- | -------- |
| value         | itemType为cascader时,指定value字段名    | string  |            | value    |
| label         | itemType为cascader时,指定label字段名    | string  |            | label    |
| children      | itemType为cascader时,指定children字段名 | string  |            | children |
| multiple      | 多选                                    | boolean | true/false | false    |
| checkStrictly | 父子节点不互相关联                      | boolean | true/false | false    |

