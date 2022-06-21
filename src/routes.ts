/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-21 20:00:24
 * @LastEditTime: 2022-06-21 20:16:30
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \math_test_questions_generator\src\routes.ts
 */
import home from './views/home.svelte'
import addSub from './views/add_sub.svelte'

export default {
    '/': home,
    '/addSub/': addSub
}
