<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-16 11:37:44
 * @LastEditTime: 2023-04-08 21:20:18
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\index\logDialog.vue
-->
<template>
    <ClientOnly>
        <el-dialog
            :modelValue="show"
            @open="handleOpen"
            :before-close="handleClose"
            append-to-body
            title="更新日志"
            width="75%"
        >
            <el-timeline class="overflow-auto">
                <el-timeline-item
                    v-for="log in logs"
                    :timestamp="log.date"
                    placement="top"
                >
                    <template v-for="(child, index) in log.children">
                        <div
                            class="flex items-center gap-4"
                            :class="{
                                'mt-10': index > 0
                            }"
                        >
                            <div class="text-base font-bold">
                                {{ child.title }}
                            </div>
                            <a
                                v-if="child.url"
                                :href="child.url"
                                target="_blank"
                                class="text-blue-400"
                                >访问网站</a
                            >
                            <a
                                v-if="child.github"
                                :href="child.github"
                                target="_blank"
                                class="text-blue-400"
                                >源码地址</a
                            >
                        </div>
                        <div
                            class="whitespace-pre"
                            v-html="child.content"
                        ></div>
                    </template>
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </ClientOnly>
</template>
<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:show'])

const handleOpen = () => {}
const handleClose = () => {
    emits('update:show', false)
}

const logs = [
    {
        date: '2023年4月',
        children: [
            {
                title: '新增数学类',
                content: `
                新增：数独（四宫数独、六宫数独、九宫数独）。
                `
            }
        ]
    },
    {
        date: '2023年3月',
        children: [
            {
                title: '新增数学类',
                content: `
                新增：认识钟表。
                `
            },
            {
                title: '新版本上线',
                url: 'https://www.dayin.page/?ref=log',
                content: `
                启用顶级域名 DaYin.page 。
                `
            },
            {
                title: '接入兔小巢',
                url: 'https://support.qq.com/product/530277?ref=log',
                content: `
                接入反馈系统，如果你有什么建议或意见，欢迎反馈。
                `
            },
            {
                title: '新增语文类',
                content: `
                新增：拼音字母。
                新增：一年级汉字字帖。
                `
            },
            {
                title: '新增空白模板',
                content: `
                新增：四线三格（拼音）模板。
                新增：田字格模板。
                `
            }
        ]
    },
    {
        date: '2023年2月',
        children: [
            {
                title: '新增数学类',
                content: `
                新增：加法练习题。
                新增：减法练习题。
                新增：加减法混合运算。
                新增：凑十法。
                新增：分成练习题。
                新增：比大小。
                `
            },
            {
                title: '重新出发，开发新版本',
                content: `
                打破数学题单一模式，尝试更多 “题+打印” 类目。
                `
            }
        ]
    },
    {
        date: '2022年',
        children: [
            {
                title: '发布并开源 “加减法数学题生成器”',
                url: 'https://nmtuan.github.io/maths/?ref=dayin.page.log',
                github: 'https://github.com/NMTuan/maths',
                content: `
                尝试使用 svelte 开发了一个生成数学题的静态页面。
                github 获得140 star，每天都有几百用户使用。
                `
            }
        ]
    }
]
</script>
