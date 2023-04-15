/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-06 11:28:51
 * @LastEditTime: 2023-04-10 21:58:10
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMaths\plugins\seo.js
 */
const data = {
    '/': {
        title: '首页',
        keywords: '数学题,字帖,打印',
        description:
            '强大、易用的一键生成数学题、描红字帖及各种空白模板。让眼睛回归纸张，远离屏幕设备。适合幼儿园、幼小衔接、小学一年级、二年级等各年龄段使用。'
    },
    '/math/addition': {
        title: '加法、连加、填空、口算练习题 - 数学',
        keywords: '加法,口算,数学,打印',
        description:
            'A4纸一键打印适合幼儿园、幼小衔接、小学一年级、二年级的加法/连加数学题，10以内至100以内口算练习题。'
    },
    '/math/subtraction': {
        title: '减法、连减、填空、口算练习题 - 数学',
        keywords: '减法,口算,数学,打印',
        description:
            'A4纸一键打印适合幼儿园、幼小衔接、小学一年级、二年级的减法/连减数学题，10以内至100以内口算练习题。'
    },
    '/math/add_sub': {
        title: '加减法混合运算、填空、口算练习题',
        keywords: '加减法,混合运算,打印,数学',
        description:
            'A4纸一键打印加减法混合运算数学题，10以内至100以内口算练习题。适合幼儿园、幼小衔接、小学一年级、二年级等各年龄段使用。'
    },
    '/math/make_ten': {
        title: '20以内凑十法练习题 - 数学',
        keywords: '凑十法,进位加法,数学,打印',
        description:
            'A4纸一键打印20以内凑十法练习题。适合幼儿园、幼小衔接、小学一年级等。'
    },
    '/math/break_ten': {
        title: '20以内破十法练习题 - 数学',
        keywords: '破十法,退位减法,数学,打印',
        description:
            'A4纸一键打印20以内破十法练习题。适合幼儿园、幼小衔接、小学一年级等。'
    },
    '/math/composition': {
        title: '数字的分解与组成 - 数学',
        keywords: '分成,数学,打印',
        description:
            'A4纸一键打印10以内至100以内分成练习题。适合幼儿园、幼小衔接、小学一年级等。'
    },
    '/math/compare': {
        title: '比大小 - 数学',
        keywords: '比大小,数字启蒙,打印',
        description:
            'A4纸一键打印10以内至100以内的数字大小比较。适合幼儿园3-6岁小朋友。'
    },
    '/math/clock': {
        title: '认识钟表 - 数学',
        keywords: '认识钟表,24计时法,打印',
        description:
            'A4纸一键打印认识钟表的练习题，看钟表认时间，根据时间画时针分针,适配24计时法。适合幼儿园及一年级小朋友。'
    },
    '/math/sudoku': {
        title: '数独 - 数学',
        keywords: '四宫数独,六宫数独,旧宫数独,打印',
        description:
            'A4纸一键打印数独，包含四宫数独、六宫数独、旧宫数独。适合幼儿园及一年级小朋友。'
    },
    '/chinese/pinyin': {
        title: '汉语拼音描红字帖 - 语文',
        keywords: '拼音字帖,3-6岁,拼音启蒙,打印',
        description:
            '适合幼儿园3-6岁小朋友汉语拼音启蒙，打印声母、韵母、整体认读、声调描红字帖。'
    },
    '/template/pinyin': {
        title: '四线三格（拼音）- 模板',
        keywords: '四线三格,拼音,模板,打印',
        description: 'A4纸一键打印标准拼音四线三格模板。'
    }
}

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    // 返回data中的数据，key是 useRoute(),path
    const getSeoInfo = () => {
        const route = useRoute()
        const info = { ...data[route.path.toLowerCase()] }

        // 统一增加站点名称
        if (info.title) {
            info.title += ` - ${runtimeConfig.public.title}`
        }
        return info
    }

    return {
        provide: {
            getSeoInfo
        }
    }
})
