let obj = {
    label: '项目编号',   //表头名称
    prop: 'no',         // prop
    check: true,        // 是否显示
    width: '150',       // 宽度
    minWidth: '150',    // 最小宽度
    sortable: false,    // 是否需要排序
    type: 'router',     // 类型
    routerName: 'test', // type为router时, 需要跳转的路由name
    routerId: 'id',     // type为router时, 需要跳转的路由携带的id的prop
    routerParams: {     // type为router时, 需要跳转的路由携带的参数
        versions: '1',
    },
    array: []   //  type为array时必传
}