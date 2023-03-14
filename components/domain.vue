<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-07 10:12:33
 * @LastEditTime: 2023-03-07 10:49:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\domain.vue
-->
<template>
    <span>{{ domain }}</span>
</template>
<script setup>
const props = defineProps({
    protocol: { // 协议
        type: Boolean,
        default: false
    },
    www: {  // 包括www
        type: Boolean,
        default: false
    },
    hump: { // 驼峰
        type: Boolean,
        default: false
    }

})
const d = 'KCpLqzHYwWP:MTsQflgo.BuASEtVdJODN/ayXbUvkGRxmirceIhjFnZ/'
const domain = computed(() => {
    let str = []
    if (props.protocol) {
        // https://
        str = str.concat([50, 26, 26, 2, 14, 11, 33, 55])
    }
    if (props.www) {
        // www.
        str = str.concat([8, 8, 8, 20])
    }
    if (props.hump) {
        // DaYin
        str = str.concat([31, 34, 7, 45, 53])
    } else {
        // dayin
        str = str.concat([28, 34, 35, 45, 53])
    }
    // .page
    str = str.concat([20, 2, 34, 18, 48])

    return str.reduce((total, item) => {
        total += d[item]
        return total
    }, '')

})
</script>
