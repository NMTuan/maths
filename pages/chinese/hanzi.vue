<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-14 10:29:36
 * @LastEditTime: 2023-04-13 21:34:33
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\chinese\hanzi.vue
-->
<template>
    <TemplateTian :trace="trace">
        <template #config="{ rows }">
            <el-form-item label="" class="mr-4">
                <el-checkbox v-model="trace" label="描红" /> {{ row }}
            </el-form-item>
            <el-form-item label="" class="">
                <el-checkbox v-model="loop" label="循环填充" />
            </el-form-item>
            <ChineseHanziChooseContent
                v-model:content="content"
                v-model:show="showContentDialog"
                :rows="rows"
            >
            </ChineseHanziChooseContent>
        </template>
        <template #button>
            <el-button type="primary" plain @click="chooseContent"
                >设定内容</el-button
            >
        </template>
        <template #content="{ index }">
            {{ loop ? content[index % content.length] : content[index] }}
        </template>
    </TemplateTian>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const trace = useCookie('chinese_hanzi_trace') // 描边
trace.value = trace.value || false

const loop = useCookie('chinese_hanzi_loop') // 循环填充
loop.value = loop.value || false

const content = useCookie('chinese_hanzi_content') // 打印内容
content.value = content.value || ['一', '二', '三', '十', '木', '禾']
const showContentDialog = ref(false)

// 选择打印内容
const chooseContent = () => {
    showContentDialog.value = true
}
</script>
<script>
export default {
    page: {
        name: '汉字字帖'
    }
}
</script>
