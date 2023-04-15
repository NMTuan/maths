<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-13 10:48:26
 * @LastEditTime: 2023-03-14 11:18:49
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\pinyin\index.vue
-->
<template>
    <LayoutPaper title="四线三格（拼音）">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="尺寸" class="w-32 mr-4">
                        <el-select
                            v-model="currentConfigIndex"
                            placeholder=""
                            @change="changeSize"
                        >
                            <el-option
                                v-for="(item, index) in config"
                                :key="item.size"
                                :label="item.label"
                                :value="index"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行数" class="w-28 mr-4">
                        <el-select v-model="rows" placeholder="">
                            <el-option
                                v-for="item in currentConfig.maxRows"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列数" class="w-28 mr-4">
                        <el-select v-model="cols" placeholder="">
                            <el-option
                                v-for="item in currentConfig.maxCols"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <slot name="config" :rows="rows"></slot>
                </el-form>
                <el-form class="flex-shrink-0 flex items-center flex-wrap">
                    <el-form-item label="" class="">
                        <el-button-group>
                            <slot name="button"></slot>
                            <el-button type="primary" @click="print"
                                >打印</el-button
                            >
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <TemplatePinyinRow
            v-for="(item, index) in rows"
            :size="currentSize"
            :cols="cols"
            :trace="trace"
        >
            <slot name="content" :item="item" :index="index"></slot>
        </TemplatePinyinRow>
        <slot></slot>
    </LayoutPaper>
</template>
<script setup>

const props = defineProps({
    trace: {    // 是否描红
        type: Boolean,
        default: false
    }
})

// 配置项
const config = [
    { label: '较小 - 行高0.96cm', size: 'sm', maxRows: 20, maxCols: 14 },
    { label: '适中 - 行高1.20cm', size: 'base', maxRows: 15, maxCols: 12 },
    { label: '较大 - 行高1.50cm', size: 'lg', maxRows: 14, maxCols: 12 },
    { label: '巨大 - 行高1.80cm', size: 'xl', maxRows: 12, maxCols: 10 }
]
const currentConfigIndex = useCookie('template_pinyin_current_config')   // 当前配置项索引
currentConfigIndex.value = currentConfigIndex.value === undefined ? 1 : currentConfigIndex.value
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
