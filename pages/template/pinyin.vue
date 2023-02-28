<template>
    <LayoutPaper>
        <div class="flex">
            <TemplatePinyinItem class="flex-1 border-x border-cool-gray-400 -ml-1px" v-for="i in 10">
                a
            </TemplatePinyinItem>
        </div>
        <div class="flex flex-wrap justify-between">
            <TemplatePinyinItem v-for="item in content.replaceAll('-', ' ')">
                {{ item }}
            </TemplatePinyinItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const content = 'hàn-yǔ-pīn-yīn-shū-xiě-bǐ-shùn-jí-sì-xiàn-gé-wèi-zhì-yī-bǐ-zuǒ-bàn-yuán-èr-bǐ-shù-yòu-wān-zhàn-zhōng-gé-yī-bǐ-yuán-zuǒ-shàng-qǐ-bǐ-zhàn-zhōng-gé-yī-bǐ-héng-zài-zuǒ-bàn-yuán-zhàn-zhōng-gé-yī-bǐ-shù-èr-bǐ-diǎn-zhàn-shàng-zhōng-gé-yī-bǐ-shù-yòu-wān-èr-bǐ-shù-zhàn-zhōng-gé-yī-bǐ-shù-yòu-wān-èr-bǐ-shù-sān-bǐ-diǎn-sì-bǐ-diǎn-zhàn-shàng-zhōng-gé-yī-bǐ-yòu-xié-èr-bǐ-zuǒ-xié-zhàn-zhōng-xià-gé-yī-bǐ-xié-xià-xié-shàng-èr-bǐ-xié-xià-xié-shàng-zhàn-zhōng-gé-yī-bǐ-shù-èr-bǐ-yòu-bàn-yuán-zhàn-shàng-zhōng-gé-yī-bǐ-shù-èr-bǐ-yòu-bàn-yuán-zhàn'

</script>
<script>
export default {
    page: {
        name: '拼音（四线三格）',
        sort: 200
    }
}
</script>
