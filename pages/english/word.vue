<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-04-25 06:38:13
 * @LastEditTime: 2023-04-26 07:04:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\english\word.vue
-->
<template>
    <TemplateEnglish :trace="trace" title="英文字母字帖">
        <template #config="{ rows }">
            <el-form-item label="" class="mr-4">
                <el-checkbox v-model="trace" label="描红" />
            </el-form-item>
            <el-form-item label="" class="">
                <el-checkbox v-model="loop" label="循环填充" />
            </el-form-item>
            <EnglishChooseContent
                v-model:content="content"
                v-model:show="showContentDialog"
                :rows="rows"
            >
            </EnglishChooseContent>
        </template>
        <template #button>
            <el-button type="primary" plain @click="chooseContent"
                >选择内容</el-button
            >
        </template>
        <template #content="{ index }">
            {{ loop ? content[index % content.length] : content[index] }}
        </template>
    </TemplateEnglish>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const trace = useCookie('english_word_trace') // 描边
trace.value = trace.value || false

const loop = useCookie('english_word_loop') // 循环填充
loop.value = loop.value || false

const content = useCookie('english_word_content') // 打印内容
content.value = content.value || ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg']
const showContentDialog = ref(false)

// 选择打印内容
const chooseContent = () => {
    showContentDialog.value = true
}
</script>
<script>
export default {
    page: {
        name: '英文字母字帖'
    }
}
</script>
