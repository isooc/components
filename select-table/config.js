import { INVOICE_TYPE_OPTIONS } from '@/utils/constant'
let config = {
    // 劳务分包合同
    laborSubcontract: {
        api: 'projectFileRegisterApi.getLaborSubcontractRegistFindList',
        title: [
            {
                label: '合同编号',
                value: 'contractNo',
            },
            {
                label: '合同名称',
                value: 'contractName',
            },
        ],
    },
    // 供应商账户管理 - 新增账户
    supplierAccount: {
        api: 'teamApi.fetchSupplierAll',
        title: [
            {
                label: '供应商类型',
                value: 'supplierTypeDesc',
            },
            {
                label: '供应商名称',
                value: 'customerCompanyName',
            },
        ],
    },
    // 项目合同申请 - 所属报备
    report: {
        api: 'teamApi.fetchReportAll',
        title: [
            {
                label: '报备编号',
                value: 'projNo',
            },
            {
                label: '报备名称',
                value: 'projName',
            },
        ],
    },
    // 税跨报登记 - 税跨报编号
    transTax: {
        api: 'prepayApi.getRegionTransTaxApply',
        title: [
            // {
            //     label: '税跨报编号',
            //     value: 'taxNum',
            // },
            {
                label: '税跨报申请编号',
                value: 'applyNo',
            },
        ],
    },
    // 关联申请记录列表（材料合同）
    EO_MATERIAL: {
        api: 'purchaseContractApi.getPurchaseContractFindList',
        title: [
            {
                label: '合同申请编号',
                value: 'contractNo',
            },
            {
                label: '合同申请名称',
                value: 'contractName',
            },
        ],
    },
    // 关联申请记录列表（机械合同）
    EO_MECHANICS: {
        api: 'purchaseContractApi.getLeaseContractFindList',
        title: [
            {
                label: '合同申请编号',
                value: 'contractNo',
            },
            {
                label: '合同申请名称',
                value: 'contractName',
            },
        ],
    },
    // 关联申请记录列表（服务合同）
    EO_PROVIDER: {
        api: 'purchaseContractApi.getConsultContractFindList',
        title: [
            {
                label: '合同申请编号',
                value: 'contractNo',
            },
            {
                label: '合同申请名称',
                value: 'contractName',
            },
        ],
    },
    // 关联申请记录列表（劳务合同）
    EO_LABOR: {
        api: 'purchaseContractApi.getLaborContractFindList',
        title: [
            {
                label: '合同申请编号',
                value: 'contractNo',
            },
            {
                label: '合同申请名称',
                value: 'contractName',
            },
        ],
    },
    // 邀请项目部-选择项目
    TEAM_PROJECT: {
        api: 'teamApi.fetchInvationProjList',
        title: [
            {
                label: '项目编号',
                value: 'projNo',
            },
            {
                label: '项目名称',
                value: 'projName',
            },
        ],
    },
    // 合同登记-关联项目合同申请
    PROJECT_CONTRACT_APPLY: {
        api: 'projectApi.getProjectContractQueryById',
        title: [
            {
                label: '申请编号',
                value: 'contractNo',
            },
            {
                label: '申请名称',
                value: 'contractName',
            },
        ],
    },
    // 关联发票
    RELATE_INVOICE: {
        api: 'operationApi.getRelateInvoiceList',
        title: [
            {
                label: '开票日期',
                value: 'invoiceCreatedTime',
                type: 'date',
                format: 'YYYYMMDD'
            },
            {
                label: '发票登记编号',
                value: 'checkinNo',
            },
            {
                label: '发票类型',
                value: 'invoiceType',
                type: 'array',
                array: INVOICE_TYPE_OPTIONS
            },
        ],
    },
    // 冻结主体（商务经理）
    allRelationManager: {
        api: 'commonApi.getAllRelationManager',
        title: [
            {
                label: '商务经理姓名',
                value: 'name',
            },
            {
                label: '商务经理加盟组织',
                value: 'userCompanyName',
            },
            {
                label: '所属分公司',
                value: 'branchName',
            },
        ],
    },
    // 冻结业务
    fundFrozenRecord: {
        api: 'operationApi.getFundFrozenRecord',
        title: [
            {
                label: '业务编号',
                value: 'bizNo',
            },
            {
                label: '商务经理',
                value: 'userName',
            },
            {
                label: '冻结金额',
                value: 'frozenAmount',
            },
        ],
    }
}

export default config
