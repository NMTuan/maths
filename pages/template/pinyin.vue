<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:24:53
 * @LastEditTime: 2023-03-06 14:29:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\template\pinyin.vue
-->
<template>
    <LayoutPaper title="四线三格（拼音）">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="尺寸" class="w-32 mr-4">
                        <el-select v-model="currentConfigIndex" placeholder="" @change="changeSize">
                            <el-option v-for="(item, index) in config" :key="item.size" :label="item.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行数" class="w-28 mr-4">
                        <el-select v-model="rows" placeholder="">
                            <el-option v-for="item in currentConfig.maxRows" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列数" class="w-28 mr-4">
                        <el-select v-model="cols" placeholder="">
                            <el-option v-for="item in currentConfig.maxCols" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form class="flex-shrink-0 flex items-center flex-wrap">
                    <el-form-item label="" class="">
                        <el-button-group>
                            <el-button type="primary" @click="print">打印</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <TemplatePinyinLine v-for='item in rows' :size="currentSize" :cols="cols">
        </TemplatePinyinLine>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

// 配置项
const config = [
    { label: '适中 -（行高0.96cm）', size: 'base', maxRows: 20, maxCols: 14 },
    { label: '较大 -（行高1.20cm）', size: 'lg', maxRows: 15, maxCols: 12 },
]
const currentConfigIndex = useCookie('template_pinyin_current_config')   // 当前配置项索引
currentConfigIndex.value = currentConfigIndex.value || 0
const currentConfig = computed(() => config[currentConfigIndex.value])
const currentSize = computed(() => currentConfig.value.size)   // 当前尺寸
const rows = useCookie('template_pinyin_rows') // 行数
rows.value = rows.value || currentConfig.value.maxRows
const cols = useCookie('template_pinyin_cols')    // 列数
cols.value = cols.value || currentConfig.value.maxCols

const changeSize = () => {
    if (rows.value > currentConfig.value.maxRows) {
        rows.value = currentConfig.value.maxRows
    }
    if (cols.value > currentConfig.value.maxCols) {
        cols.value = currentConfig.value.maxCols
    }
}

const print = () => {
    window.print()
}

</script>
<script>
export default {
    page: {
        name: '四线三格（拼音）'
    }
}
</script>
