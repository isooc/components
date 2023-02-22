import { ref, isRef, unref, watchEffect } from 'vue'
import { postJson } from '@/api/http.js'
export function useGetList (url, params = {}) {
    let loading = $ref(false)
    let list = $ref([])
    let currentPage = $ref(1)
    let pageSize = $ref(20)
    let total = $ref(5)

    let error = $ref()

    function getList (url, params) {
        loading = true
        postJson(url, params).then(res => {
            loading = false
            list = res.data.list
            currentPage = res.data.currentPage
            pageSize = res.data.pageSize
            pageSize = res.data.pageSize

            return { getList, loading, list, currentPage, pageSize, total, error }
        }, err => {
            loading = false
            error = err
        })
    }


    getList(url, params)

    return { getList, loading, list, currentPage, pageSize, total, error }
}
