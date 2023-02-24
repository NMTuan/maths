<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2023-02-20 09:51:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\index.vue
-->
<template>
    <div class="overflow-hidden ">
        index
        <span v-for="i in 600"> {{ i }}x </span>
    </div>
</template>
<script>
export default {
    page: {
        name: '首页'
    }
}
</script>
