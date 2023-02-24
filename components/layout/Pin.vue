<template>
    <div class=" i-ri-menu-line text-xl cursor-pointer" @click="togglePin">
    </div>
</template>
<script setup>
const props = defineProps({
    pin: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits(['update:pin'])

// 切换 pin 状态
const togglePin = () => {
    emits('update:pin', props.pin === 1 ? 0 : 1)
}

</script>
