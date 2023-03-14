<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-02 09:53:33
 * @LastEditTime: 2023-03-14 11:43:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\chinese\hanzi\chooseContent.vue
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
        label: '一年级上册', children: [
            { label: "", value: ["一", "二", "三"] },
            { label: "", value: ["十", "木", "禾"] },
            { label: "", value: ["上", "下", "土", "个"] },
            { label: "", value: ["八", "入", "大", "天"] },
            { label: "", value: ["牛", "羊", "小", "少"] },
            { label: "", value: ["巾", "牙", "尺", "毛"] },
            { label: "", value: ["卜", "又", "心", "风"] },
            { label: "", value: ["力", "手", "水"] },

            { label: "", value: ["人", "火", "文", "六"] },
            { label: "", value: ["七", "儿", "九", "无"] },
            { label: "", value: ["口", "日", "中"] },
            { label: "", value: ["了", "子", "门", "月"] },
            { label: "", value: ["不", "开", "四", "五"] },
            { label: "", value: ["目", "耳", "头", "米"] },
            { label: "", value: ["见", "白", "田", "电"] },
            { label: "", value: ["也", "长", "山", "出"] },
            { label: "", value: ["飞", "马", "鸟"] },
            { label: "", value: ["云", "公", "车"] },
            { label: "", value: ["广", "升", "足", "走"] },
            { label: "", value: ["方", "半", "巴"] },
            { label: "", value: ["业", "本", "平", "书"] },
            { label: "", value: ["自", "已", "东", "西"] },
            { label: "", value: ["回", "片", "皮"] },
            { label: "", value: ["生", "里", "果"] },
            { label: "", value: ["几", "用", "鱼"] },
            { label: "", value: ["今", "正", "雨", "两"] },
            { label: "", value: ["瓜", "衣", "来"] },
            { label: "", value: ["年", "左", "右"] },
        ]
    },
    {
        label: '一年级下册', children: [
            { label: "", value: ["说", "话", "朋", "友", "春", "高"] },
            { label: "", value: ["你", "们", "红", "绿", "花", "草"] },
            { label: "", value: ["爷", "节", "岁", "亲", "的", "行"] },
            { label: "", value: ["古", "声", "多", "处", "知", "忙"] },
            { label: "", value: ["爸", "全", "关", "写", "完", "家"] },
            { label: "", value: ["看", "着", "画", "笑", "兴", "会"] },
            { label: "", value: ["妈", "奶", "午", "合", "放", "收"] },
            { label: "", value: ["女", "太", "气", "早", "去", "亮"] },
            { label: "", value: ["听", "唱", "连", "远", "定", "向"] },
            { label: "", value: ["以", "后", "更", "主", "意", "总"] },
            { label: "", value: ["先", "干", "赶", "起", "明", "净"] },
            { label: "", value: ["同", "工", "专", "才", "级", "队"] },
            { label: "", value: ["诗", "林", "童", "黄", "闭", "立"] },
            { label: "", value: ["是", "朵", "美", "我", "叶", "机"] },
            { label: "", value: ["她", "他", "送", "过", "时", "让"] },
            { label: "", value: ["吗", "吧", "虫", "往", "得", "很"] },
            { label: "", value: ["河", "姐", "借", "呢", "呀", "哪　"] },
            { label: "", value: ["园", "因", "为", "脸", "阳", "光"] },
            { label: "", value: ["可", "石", "办", "法", "找", "许"] },
            { label: "", value: ["别", "到", "那", "都", "吓", "叫"] },
            { label: "", value: ["再", "象", "像", "做", "点", "照"] },
            { label: "", value: ["井", "乡", "面", "忘", "想", "念"] },
            { label: "", value: ["王", "从", "边", "这", "进", "道"] },
            { label: "", value: ["贝", "原", "男", "爱", "虾", "跑"] },
            { label: "", value: ["吹", "地", "快", "乐", "老", "师"] },
            { label: "", value: ["拉", "把", "给", "活", "种", "吃"] },
            { label: "", value: ["练", "习", "苦", "学", "非", "常"] },
            { label: "", value: ["问", "间", "伙", "伴", "共", "汽"] },
            { label: "", value: ["分", "要", "没", "位", "孩", "选"] },
            { label: "", value: ["只", "星", "雪", "帮", "请", "就"] },
            { label: "", value: ["球", "玩", "跳", "桃", "树", "刚"] },
            { label: "", value: ["兰", "各", "坐", "座", "带", "急"] },
            { label: "", value: ["名", "发", "成", "晚", "动", "新"] },
            { label: "", value: ["有", "在", "什", "么", "变", "条"] },
            { label: "", value: ["万", "丁", "冬", "百", "齐"] },
            { label: "", value: ["洗", "认", "扫", "真", "父", "母"] },
            { label: "", value: ["和", "语", "千", "李", "秀", "香"] },
            { label: "", value: ["蚂", "蚁", "前", "空", "房", "网"] },
            { label: "", value: ["谁", "怕", "跟", "凉", "量", "最"] },
            { label: "", value: ["沙", "海", "桥", "竹", "军", "苗"] },
            { label: "", value: ["北", "南", "江", "湖", "秋"] },
            { label: "", value: ["短", "对", "冷", "淡", "热", "情"] },
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
