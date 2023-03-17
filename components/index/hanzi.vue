<template>
    <div class="bg-white p-8 mt-12 mx-auto max-w-790px shadow-lg">
        <div class="flex items-center justify-center flex-wrap gap-3">
            <TemplateTianItem :customClass="customClass">天</TemplateTianItem>
            <TemplateTianItem :customClass="customClass" class="text-cool-gray-300">道</TemplateTianItem>
            <TemplateTianItem :customClass="customClass" class="text-cool-gray-300">酬</TemplateTianItem>
            <TemplateTianItem :customClass="customClass" class="text-cool-gray-300">勤</TemplateTianItem>
        </div>
    </div>
</template>
<script setup>
const customClass = computed(() => {
    return [
        'text-160px',
        'w-42',
        'h-42',
        'flex-shrink-0',
    ]
})
</script>
