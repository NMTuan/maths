/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-21 19:41:22
 * @LastEditTime: 2022-06-21 19:48:30
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \math_test_questions_generator\vite.config.ts
 */
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), Unocss()]
})
