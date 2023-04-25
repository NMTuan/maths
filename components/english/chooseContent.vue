<template>
    <ClientOnly>
        <el-dialog
            :modelValue="show"
            @open="handleOpen"
            :before-close="handleClose"
            append-to-body
            title="选择内容"
            width="75%"
        >
            <el-form label-width="auto">
                <el-form-item v-for="item in words" :label="item.label">
                    <template v-for="child in item.children">
                        <el-checkbox-group
                            v-model="content"
                            size="large"
                            class="mr-2"
                        >
                            <el-checkbox-button
                                v-for="word in child.value"
                                :key="word"
                                :label="word"
                                :disabled="
                                    !content.includes(word) &&
                                    content.length >= rows
                                "
                                class="mb-2"
                            >
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
        label: '大写字母',
        children: [
            { label: '', value: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
            { label: '', value: ['H', 'I', 'J', 'K', 'L', 'M', 'N'] },
            { label: '', value: ['O', 'P', 'Q', 'R', 'S', 'T'] },
            { label: '', value: ['U', 'V', 'W', 'X', 'Y', 'Z'] }
        ]
    },
    {
        label: '小写字母',
        children: [
            { label: '', value: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] },
            { label: '', value: ['h', 'i', 'j', 'k', 'l', 'm', 'n'] },
            { label: '', value: ['o', 'p', 'q', 'r', 's', 't'] },
            { label: '', value: ['u', 'v', 'w', 'x', 'y', 'z'] }
        ]
    },
    {
        label: '大小写字母',
        children: [
            { label: '', value: ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg'] },
            { label: '', value: ['Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn'] },
            { label: '', value: ['Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt'] },
            { label: '', value: ['Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz'] }
        ]
    }
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
