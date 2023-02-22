<template>
    <div class="fund-page">
        <el-form ref="formRef" :model="formData" label-position="left" :label-width="labelWidth">
            <el-form-item label="数据" prop="ids">
                <select-table
                    v-model="formData.ids"
                    :disabled="disabledEdit"
                    @changeCb="handleSelect"
                    :params="{ params1: '' }"
                    :showLabel="{ ids: formData.ids, name: formData.userName }"
                    searchParams="searchKey"
                    :prop="{ value: 'ids', label: 'name' }"
                    :type="'allRelationManager'"
                    :setKey="['branchId', 'userId', 'userCompanyId']"
                >
                </select-tab>
            </el-form-item>

            <div class="form-footer">
                <el-button @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import selectTable from './index.vue'

defineOptions({
  name: 'use',
})

const router = useRouter()
const { appContext } = getCurrentInstance()
const { utils, rules, $Request, $confirm, $message, constant, $route, filters } = appContext.config.globalProperties

let loading = $ref(false)

const labelWidth = 110

const formRef = $ref()
let formData = $ref({
  ids: '',
})

let disabledEdit = $ref(false)

const handleSelect = row => {
  if (row) {
  } else {
  }
}

const handleSubmit = async () => {
  formRef.validate(valid => {
    if (valid) {
    } else {
    }
  })
}

/**
 * 重置表单
 */
const handleReset = () => {
  formRef.resetFields()
}


onMounted(() => {
})

</script>

<style lang="scss" scoped>
</style>