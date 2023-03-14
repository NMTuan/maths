<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:21:09
 * @LastEditTime: 2023-03-14 10:00:48
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\chinese\Pinyin.vue
-->
<template>
    <div>
        <TemplatePinyin :trace="trace">
            <template #config="{ rows }">
                <el-form-item label="" class="mr-4">
                    <el-checkbox v-model="trace" label="描红" />
                </el-form-item>
                <el-form-item label="" class="">
                    <el-checkbox v-model="loop" label="循环填充" />
                </el-form-item>
                <ChinesePinyinChooseContent v-model:content="content" v-model:show="showContentDialog" :rows="rows">
                </ChinesePinyinChooseContent>
            </template>
            <template #button>
                <el-button type="primary" plain @click="chooseContent">选择内容</el-button>
            </template>
            <template #content="{ index }">
                {{ loop ? content[index % content.length] : content[index] }}
            </template>
        </TemplatePinyin>
    </div>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)


const trace = useCookie('chinese_pinyin_trace') // 描边
trace.value = trace.value || false

const loop = useCookie('chinese_pinyin_loop')   // 循环填充
loop.value = loop.value || false

const content = useCookie('chinese_pinyin_content') // 打印内容
content.value = content.value || ["a", "o", "e", "i", "u", "ü"]
const showContentDialog = ref(false)

// 选择打印内容
const chooseContent = () => {
    showContentDialog.value = true
}

const print = () => {
    window.print()
}

</script>
<script>
export default {
    page: {
        name: '拼音字帖',
        sort: 200
    }
}
</script>
