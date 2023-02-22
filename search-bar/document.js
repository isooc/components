formOpt = {
    advancedSearch: false, // 是否使用高级搜索 默认false
    searchParams: 'keyWord', // 高级搜索参数,默认keyWord
    vaguePlaceholder: '请输入',   // 默认:请输入
    inline: false, // 是否行内表单 默认false
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