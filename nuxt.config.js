/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2023-03-16 15:05:48
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMaths\nuxt.config.js
 */

import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: 'https://hm.baidu.com/hm.js?88b3bb5cc22501a1425b3180219c72f2'
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            title: '习题打印生成器 www.dayin.page'
        }
    },
    css: [
        // '@unocss/reset/normalize.css',
        '@unocss/reset/tailwind.css',
        'simplebar-vue/dist/simplebar.min.css'
    ],
    devServer: {
        port: '9999'
    },
    modules: [
        '@unocss/nuxt',
        '@intlify/nuxt3',
        '@nuxtjs/color-mode',
        '@element-plus/nuxt'
    ],
    unocss: {
        // presets
        uno: true, // enabled `@unocss/preset-uno`
        icons: true, // enabled `@unocss/preset-icons`
        attributify: true, // enabled `@unocss/preset-attributify`,
        transformers: [transformerDirectives(), transformerVariantGroup()],
        shortcuts: [],
        rules: [],
        safelist: []
    },
    intlify: {
        localeDir: 'locales',
        vueI18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN'
        }
    },
    colorMode: {
        classSuffix: ''
    },
    elementPlus: {
        /** Options */
    }
})
