/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-15 16:33:04
 * @LastEditTime: 2023-03-15 17:00:59
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\plugins\utils.js
 */
export default defineNuxtPlugin(() => {
    // 生成随机数
    const random = (min = 0, max = 10) => {
        return Math.round(Math.random() * (max - min)) + min
    }

    return {
        provide: {
            random
        }
    }
})
