/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-15 15:36:26
 * @LastEditTime: 2023-02-15 15:37:38
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMaths\components\layout\plugins\pages.js
 */
export default defineNuxtPlugin(() => {
    const files = import.meta.globEager('@/pages/**/*.vue')
    const pages = Object.keys(files).reduce((total, key) => {
        const fileName = key.replace(/^\/pages\/(.*)\.\w+$/, '$1')
        if (files[key].default.page) {
            total.push({
                ...files[key].default.page,
                fileName, // 文件名称, 没有.vue
                dynamicRoute: fileName.includes('['), //是否动态路由, 动态路由不在菜单张显示.
                routeName: fileName // 路由名称
                    .replace(/\//gi, '-')
                    .replace(/\[/gi, '')
                    .replace(/\]/gi, '')
                    .replace('-index', ''),
                level: fileName.split('/').length // 层级
            })
        }
        return total
    }, [])

    return {
        provide: {
            pages
        }
    }
})
