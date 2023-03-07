<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-02 09:53:33
 * @LastEditTime: 2023-03-07 09:58:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\chinese\pinyin\chooseContent.vue
-->
<template>
    <ClientOnly>
        <el-dialog :modelValue="show" @open="handleOpen" :before-close="handleClose" append-to-body title="选择内容"
            width="75%">
            <el-form label-width="auto">
                <el-form-item v-for="item in words" :label="item.label">
                    <template v-for="child in item.children">
                        <el-checkbox-group v-model="content" size="large" class="mr-2">
                            <el-checkbox-button v-for="word in child.value" :key="word" :label="word"
                                :disabled="!content.includes(word) && content.length >= rows" class="mb-2">
                                {{ word }}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleClose">
                        关闭
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </ClientOnly>
</template>
<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    content: {
        type: Array,
        default: () => []
    },
    rows: {
        type: Number,
        default: 0
    }
})
const emits = defineEmits(['update:show', 'update:content'])

const words = [
    {
        label: '声母', children: [
            { label: '', value: ['b', 'p', 'm', 'f'] },
            { label: '', value: ['d', 't', 'n', 'l'] },
            { label: '', value: ['g', 'k', 'h'] },
            { label: '', value: ['j', 'q', 'x'] },
            { label: '', value: ['zh', 'ch', 'sh'] },
            { label: '', value: ['r', 'z', 'c', 's'] },
            { label: '', value: ['y', 'w'] },
        ]
    },
    {
        label: '韵母', children: [
            { label: '单韵母', value: ['a', 'o', 'e', 'i', 'u', 'ü'] },
            { label: '复韵母', value: ['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er'] },
            { label: '前鼻韵母', value: ['an', 'en', 'in', 'un', 'ün'] },
            { label: '后鼻韵母', value: ['ang', 'eng', 'ing', 'ong'] },
        ]
    },
    {
        label: '整体认读',
        children: [
            { label: '', value: ['zhi', 'chi', 'shi', 'ri', 'zi', 'ci', 'si'] },
            { label: '', value: ['yi', 'wu', 'yu', 'ye', 'yue', 'yuan', 'yin', 'yun', 'ying'] },
        ]
    },
    {
        label: '声调',
        children: [
            { label: '', value: ['ā', 'ō', 'ē', 'ī', 'ū', 'ǖ'] },
            { label: '', value: ['á', 'ó', 'é', 'í', 'ú', 'ǘ'] },
            { label: '', value: ['ǎ', 'ǒ', 'ě', 'ǐ', 'ǔ', 'ǚ'] },
            { label: '', value: ['à', 'ò', 'è', 'ì', 'ù', 'ǜ'] },
        ]
    },
]

const handleOpen = () => {
    content.value = props.content
}
const handleClose = () => {
    emits('update:show', false)
    emits('update:content', content.value)
}

const content = ref([])
</script>
