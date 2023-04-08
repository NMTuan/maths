<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-24 16:50:13
 * @LastEditTime: 2023-04-08 21:03:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\sudoku.vue
-->
<template>
    <LayoutPaper title="数独">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="模式" class="w-36 mr-4">
                        <el-select
                            v-model="currentTypeIndex"
                            placeholder=""
                            @change="submit"
                        >
                            <el-option
                                v-for="(type, index) in types"
                                :key="'type' + type.key"
                                :label="type.label"
                                :value="index"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="难度" class="w-28 mr-4">
                        <el-select
                            v-model="currentLevelIndex"
                            placeholder=""
                            @change="submit"
                        >
                            <el-option
                                v-for="(type, index) in levels"
                                :key="'type' + type.key"
                                :label="type.label"
                                :value="index"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="" class="">
                        <el-checkbox v-model="showRes" label="显示答案" />
                    </el-form-item>
                </el-form>
                <el-form class="flex-shrink-0 flex items-center flex-wrap">
                    <el-form-item label="" class="">
                        <el-button-group>
                            <el-button type="primary" plain @click="submit"
                                >重新生成</el-button
                            >
                            <el-button type="primary" @click="print"
                                >打印</el-button
                            >
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <div class="flex gap-4 mb-6" v-for="(row, i) in type.row">
            <div v-for="(item, index) in type.len / type.row" class="flex-1">
                <!-- {{ (i * type.len) / type.row + index }} -->
                <MathSudokuItem
                    :data="res[(i * type.len) / type.row + index]"
                    :data-dig="res_dig[(i * type.len) / type.row + index]"
                    :type="type"
                    :showRes="showRes"
                ></MathSudokuItem>
            </div>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const res = ref([])
const res_dig = ref([])

const types = [
    // key, lable, 生成数量，行数
    { key: 4, label: '四宫数独', len: 20, row: 5 },
    { key: 6, label: '六宫数独', len: 12, row: 4 },
    { key: 9, label: '九宫数独', len: 4, row: 2 }
]
const currentTypeIndex = useCookie('math_sudoku_currentTypeIndex')
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value] || {}
})

const levels = [
    { key: 'easy', label: '简单' },
    { key: 'normal', label: '一般' },
    { key: 'hard', label: '困难' }
]
const currentLevelIndex = useCookie('math_sudoku_currentLevelIndex')
currentLevelIndex.value = currentLevelIndex.value || 0
const level = computed(() => {
    return levels[currentLevelIndex.value] || {}
})

const showRes = useCookie('math_sudoku_showRes') // 显示结果
showRes.value = showRes.value || false

const submit = () => {
    res.value = []
    res_dig.value = []
    for (let i = 0; i < type.value.len; i++) {
        const item = generateSudoku(type.value.key)

        const tmp = item.reduce((total, current) => {
            total.push([...current])
            return total
        }, [])
        res.value.push(item)
        res_dig.value.push(
            removeSudokuNumbers(level.value.key, tmp, type.value.key)
        )
    }
}

onMounted(() => {
    submit()
})

const print = () => {
    window.print()
}

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
    // res.value = sudoku
    return sudoku
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

/**
 * 挖去数独矩阵的数字
 * @param {number} level 难度等级，1为简单，2为一般，3为困难
 */
function removeSudokuNumbers(level, sudoku, size) {
    let n = { min: 1, max: size - 1 }
    if (size === 4) {
        switch (level) {
            case 'easy':
                n.min = 1
                n.max = 1
                break
            case 'normal':
                n.min = 2
                n.max = 2
                break
            case 'hard':
                n.min = 3
                n.max = 3
                break
        }
    }

    if (size === 6) {
        switch (level) {
            case 'easy':
                n.min = 1
                n.max = 2
                break
            case 'normal':
                n.min = 2
                n.max = 3
                break
            case 'hard':
                n.min = 3
                n.max = 4
                break
        }
    }

    if (size === 9) {
        switch (level) {
            case 'easy':
                n.min = 1
                n.max = 3
                break
            case 'normal':
                n.min = 3
                n.max = 5
                break
            case 'hard':
                n.min = 5
                n.max = 7
                break
        }
    }
    console.log('n', n)

    // if (level === 1) {
    //     n = 3
    // } else if (level === 2) {
    //     n = 5
    // } else if (level === 3) {
    //     n = 7
    // } else {
    //     console.error('level应满足1≤level≤3')
    //     return null
    // }

    // 生成随机序列
    const arr = Array.from({ length: size * size }, (_, index) => index)
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = arr[randomIndex]
        arr[randomIndex] = arr[i]
        arr[i] = temp
    }

    let count = 0 // 已经挖去的数字个数
    for (let i = 0; i < arr.length && count < size * n.max; i++) {
        // 每宫要挖去n个数字，因此总共要挖去9*n个数字
        const row = Math.floor(arr[i] / size) // 当前数字所在行
        const col = arr[i] % size // 当前数字所在列
        let blockRow
        let blockCol
        if (size === 6) {
            blockRow = Math.floor(row / 2) // 当前数字所在宫的行
            blockCol = Math.floor(col / 3) // 当前数字所在宫的列
        } else {
            blockRow = Math.floor(row / Math.sqrt(size)) // 当前数字所在宫的行
            blockCol = Math.floor(col / Math.sqrt(size)) // 当前数字所在宫的列
        }
        if (sudoku[row][col] !== 0) {
            let blockCount = 0 // 当前数字所在的宫已经挖去的数字个数
            if (size === 6) {
                for (let j = 0; j < 2; j++) {
                    for (let k = 0; k < 3; k++) {
                        const blockRowPos = blockRow * 2 + j // 当前宫内行坐标
                        const blockColPos = blockCol * 3 + k // 当前宫内列坐标
                        if (sudoku[blockRowPos][blockColPos] === 0) {
                            blockCount++
                        }
                    }
                }
            } else {
                for (let j = 0; j < Math.sqrt(size); j++) {
                    for (let k = 0; k < Math.sqrt(size); k++) {
                        const blockRowPos = blockRow * Math.sqrt(size) + j // 当前宫内行坐标
                        const blockColPos = blockCol * Math.sqrt(size) + k // 当前宫内列坐标
                        if (sudoku[blockRowPos][blockColPos] === 0) {
                            blockCount++
                        }
                    }
                }
            }
            if (
                blockCount >= n.min &&
                blockCount < n.max &&
                0.75 - Math.random() > 0
            ) {
                continue
            }
            if (blockCount >= n.max) {
                continue // 当前数字所在宫已经挖去n个数字，跳到下一个位置
            }
            sudoku[row][col] = 0 // 挖去当前数字
            count++
        }
    }

    return sudoku
}

</script>
<script>
export default {
    page: {
        name: '数独',
        sort: 800
    }
}
</script>
