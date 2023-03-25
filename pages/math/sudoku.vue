<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-24 16:50:13
 * @LastEditTime: 2023-03-25 15:52:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\sudoku.vue
-->
<template>
    <LayoutPaper title="数独">
        <button
            class="border px-4 py-1 rounded bg-gray-200"
            @click="generateSudoku(4)"
        >
            4
        </button>
        <button
            class="border px-4 py-1 rounded bg-gray-200"
            @click="generateSudoku(6)"
        >
            6
        </button>
        <button
            class="border px-4 py-1 rounded bg-gray-200"
            @click="generateSudoku(9)"
        >
            9
        </button>

        <div v-for="row in res">{{ row }}</div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const res = ref([])

function generateSudoku(size) {
    // 创建一个 size x size 的二维数组，用于存储数独的数字
    const sudoku = []
    for (let i = 0; i < size; i++) {
        sudoku.push(new Array(size).fill(0))
    }
    // 计算每个宫的大小
    const blockSize = Math.sqrt(size)
    // 递归地填写数独
    fillSudoku(sudoku, 0, 0, size, blockSize)
    res.value = sudoku
    // return sudoku;
}
function fillSudoku(sudoku, row, col, size, blockSize) {
    // 如果已经填写完最后一行，则返回 true
    if (row === size) {
        return true
    }
    // 计算下一个格子的行和列
    let nextRow = row
    let nextCol = col + 1
    if (nextCol === size) {
        nextRow++
        nextCol = 0
    }
    // 如果该格子已经填写过数字，则直接跳到下一个格子
    if (sudoku[row][col] !== 0) {
        return fillSudoku(sudoku, nextRow, nextCol, size, blockSize)
    }
    // 随机选择一个数字填入该格子
    const nums = shuffle([...Array(size)].map((_, i) => i + 1))
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        // 检查该数字是否符合数独的规则
        if (isValid(sudoku, row, col, num, size, blockSize)) {
            sudoku[row][col] = num
            // 递归地填写下一个格子
            if (fillSudoku(sudoku, nextRow, nextCol, size, blockSize)) {
                return true
            }
            // 如果下一个格子无法填写数字，则回溯到当前格子
            sudoku[row][col] = 0
        }
    }
    // 如果所有可能的数字都无法填入该格子，则返回 false
    return false
}
function isValid(sudoku, row, col, num, size, blockSize) {
    // 检查该数字是否已经存在于该行或该列中
    for (let i = 0; i < size; i++) {
        if (sudoku[row][i] === num || sudoku[i][col] === num) {
            return false
        }
    }
    // 检查该数字是否已经存在于该宫中
    if (size === 6) {
        // 硬判断6宫 by NMTuan
        const startRow = Math.floor(row / 2) * 2
        const startCol = Math.floor(col / 3) * 3
        for (let i = startRow; i < startRow + 2; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (sudoku[i][j] === num) {
                    return false
                }
            }
        }
    } else {
        const startRow = Math.floor(row / blockSize) * blockSize
        const startCol = Math.floor(col / blockSize) * blockSize
        for (let i = startRow; i < startRow + blockSize; i++) {
            for (let j = startCol; j < startCol + blockSize; j++) {
                if (sudoku[i][j] === num) {
                    return false
                }
            }
        }
    }

    return true
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}
</script>
<script>
export default {
    page: {
        name: '数独',
        sort: 200
    }
}
</script>
