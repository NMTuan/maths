<template>
    <div class="w-full h-0 pb-100% overflow-hidden relative">
        <div class="sudoku absolute inset-0" :class="`sudoku--${type.key}`">
            <div v-for="(row, rowIndex) in dataDig" class="row">
                <div v-for="(col, colIndex) in row" class="cell">
                    <div
                        v-if="showRes && col === 0"
                        class="relative z-10 font-bold"
                    >
                        {{ data[rowIndex][colIndex] }}
                    </div>
                    <div v-if="col !== 0" class="cell__bg"></div>
                    <div class="relative z-10">
                        {{ col === 0 ? '' : col }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    dataDig: {
        type: Array,
        default: () => []
    },
    type: {
        type: Object,
        default: () => {}
    },
    showRes: {
        type: Boolean,
        default: false
    }
})
</script>
<style lang="scss" scoped>
/* 将数独容器设置为网格布局 */
.sudoku {
    @apply flex flex-col;
    @apply border-1 border-cool-gray-600;
    @apply overflow-hidden;
    .row {
    }

    .cell {
        @apply flex flex-1 items-center justify-center;
        @apply border;
        @apply relative overflow-hidden;
        &__bg {
            @apply block w-0 h-0;
            @apply border-9999 border-cool-gray-50;
            @apply absolute top-0 left-0;
        }
    }
}

.row {
    @apply flex flex-1;
}
.sudoku--4 {
    .row:nth-child(2n + 1) {
        .cell {
            @apply border-t border-t-cool-gray-600;
        }
    }
    .row:nth-child(2n + 2) {
        .cell {
            @apply border-b border-b-cool-gray-600;
        }
    }
    .cell:nth-child(2n + 1) {
        @apply border-l border-l-cool-gray-600;
    }
    .cell:nth-child(2n) {
        @apply border-r border-r-cool-gray-600;
    }
}
.sudoku--6 {
    .row:nth-child(2n + 1) {
        .cell {
            @apply border-t border-t-cool-gray-600;
        }
    }
    .row:nth-child(2n + 2) {
        .cell {
            @apply border-b border-b-cool-gray-600;
        }
    }
    .cell:nth-child(3n + 1) {
        @apply border-l border-l-cool-gray-600;
    }
    .cell:nth-child(3n) {
        @apply border-r border-r-cool-gray-600;
    }
}
.sudoku--9 {
    .row:nth-child(3n + 1) {
        .cell {
            @apply border-t border-t-cool-gray-600;
        }
    }
    .row:nth-child(3n + 3) {
        .cell {
            @apply border-b border-b-cool-gray-600;
        }
    }
    .cell:nth-child(3n + 1) {
        @apply border-l border-l-cool-gray-600;
    }
    .cell:nth-child(3n) {
        @apply border-r border-r-cool-gray-600;
    }
}
</style>
