<template>
    <div>
        {{ item }}
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => { }
    }
})
</script>
