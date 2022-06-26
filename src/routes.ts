/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-21 20:00:24
 * @LastEditTime: 2022-06-26 20:11:33
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \math_test_questions_generator\src\routes.ts
 */
// import home from './views/home.svelte'
import addSub from './views/add_sub.svelte'
import res from './views/res.svelte'

export default {
    '/': addSub,
    '/:resultString': res
}
