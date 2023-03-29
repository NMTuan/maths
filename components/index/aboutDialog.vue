<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-16 11:37:44
 * @LastEditTime: 2023-03-17 15:08:26
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\index\aboutDialog.vue
-->
<template>
    <ClientOnly>
        <el-dialog
            :modelValue="show"
            @open="handleOpen"
            :before-close="handleClose"
            append-to-body
            title="关于"
            width="75%"
        >
            <div class="leading-8 indent-lg text-base">
                <p>
                    不知什么时候，<strong>幼儿园的孩子们也开始做题了</strong>。班级群热闹起来了，每天都有孩子学习的照片、视频。
                    “就你不着急，人家的小朋友都去幼小衔接了”。她总是一边抱怨，一边焦虑的搜着各种习题打印。
                    我瞅了一眼她打印的那些题目，说到：“你这打的啥？这么虚、水印压着题、还黑乎乎一片。我给你做个。”
                    于是，就有了去年做的那个项目：
                    <a href="https://nmtuan.github.io/maths/" target="_blank"
                        >“加减法数学题生成器”</a
                    >。
                </p>
                <p>
                    说来惭愧，我这号称要<del>改变世界</del>的双手，写了这么多年代码，真正有用的也就这玩意了。
                </p>
                <p>
                    转过年来，小妮子又开始学拼音和识字了。这次，媳妇大人变聪明了，不再去网上搜题目了。有事没事的就激我：“你不是厉害么，再写个拼音的啊”。
                    于是，就有了现在你看到的这个网站了。
                </p>
                <p><strong>这就完了么？</strong></p>
                <p>
                    不会的。目前的功能，只是个开始。还有些功能已经计划好了正准备开发。后期，也会随着小妮同学的学业，去更新一些适合打印的东西。当然，如果你有什么建议或意见，欢迎<a
                        href="https://support.qq.com/product/530277?ref=about"
                        target="_blank"
                        >点击这里</a
                    >留言反馈。
                </p>
                <p>
                    <span class="text-red-400"
                        >本站所有功能免费，除企业定制开发外，不存在任何收费点。</span
                    >
                </p>
                <p>您可以通过赞赏的方式支持我。</p>
                <p
                    class="flex flex-wrap items-center justify-around bg-cool-gray-100 py-4"
                >
                    <img
                        class="w-72 h-72 object-contain"
                        src="/wepay.jpg"
                        alt=""
                    />
                    <img
                        class="w-72 h-72 object-contain"
                        src="/afdian.jpg"
                        alt=""
                    />
                    <img
                        class="w-72 h-72 object-contain"
                        src="/alipay.jpg"
                        alt=""
                    />
                </p>
                <p>最后，感谢开发过程中用到的所有开源项目。谢谢！</p>
            </div>
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
</script>
<style lang="scss" scoped>
p {
    --at-apply: mb-6 mx-4;
}

a {
    --at-apply: text-blue-400;
    --at-apply: hover:underline;
}

a[target='_blank'] {
    &::after {
        content: ''
    }
}
</style>
