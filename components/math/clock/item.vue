<template>
    <div>
    <div class="clock">
        <div class="hour" :style="hourStyle"></div>
        <div class="minute" :style="minuteStyle"></div>
        <div class="notch">
            <div class="cover"></div>
            <div class="notch_1"></div>
            <div class="notch_2"></div>
            <div class="notch_3"></div>
            <div class="notch_4"></div>
            <div class="notch_5"></div>
            <div class="notch_6"></div>
        </div>
        <div class="dot">
            <div class="cover"></div>
            <div class="dot_1"></div>
            <div class="dot_2"></div>
            <div class="dot_3"></div>
            <div class="dot_4"></div>
            <div class="dot_6"></div>
            <div class="dot_7"></div>
            <div class="dot_8"></div>
            <div class="dot_9"></div>
            <div class="dot_11"></div>
            <div class="dot_12"></div>
            <div class="dot_13"></div>
            <div class="dot_14"></div>
            <div class="dot_16"></div>
            <div class="dot_17"></div>
            <div class="dot_18"></div>
            <div class="dot_19"></div>
            <div class="dot_21"></div>
            <div class="dot_22"></div>
            <div class="dot_23"></div>
            <div class="dot_24"></div>
            <div class="dot_26"></div>
            <div class="dot_27"></div>
            <div class="dot_28"></div>
            <div class="dot_29"></div>
            <div class="dot_31"></div>
            <div class="dot_32"></div>
            <div class="dot_33"></div>
            <div class="dot_34"></div>
        </div>
        <div class="number">
            <div class="number_1"><span>{{currentNumberType[1-1]}}</span><span>{{currentNumberType[7-1]}}</span></div>
            <div class="number_2"><span>{{currentNumberType[2-1]}}</span><span>{{currentNumberType[8-1]}}</span></div>
            <div class="number_3"><span>{{currentNumberType[3-1]}}</span><span>{{currentNumberType[9-1]}}</span></div>
            <div class="number_4"><span>{{currentNumberType[4-1]}}</span><span>{{currentNumberType[10-1]}}</span></div>
            <div class="number_5"><span>{{currentNumberType[5-1]}}</span><span>{{currentNumberType[11-1]}}</span></div>
            <div class="number_6"><span>{{currentNumberType[6-1]}}</span><span>{{currentNumberType[12-1]}}</span></div>
        </div>
        <div class="center"></div>
    </div>
    <div class="text-center my-4 text-lg">
    {{ time }}
    </div>
    </div>
</template>
<script setup>
const numberType = [
    { type: 'roman', arguments: ['1','2','3','4','5','6','7','8','9','10','11','12'] },
    { type: 'arabic', arguments: ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'] }
]
const currentNumberType = computed(() => {
    return numberType[0].arguments
})

const props = defineProps({
    time: {
        type: String,
        default: '0:00'
    }
})

const hour = computed(() => {
    return Number(props.time.split(':')[0] % 12) || 0
})
const minute = computed(() => {
    return Number(props.time.split(':')[1]) || 0
})
const hourStyle = computed(() => {
    let rotate = hour.value * 30; // 小时的旋转角度 每小时 360°/12小时 = 30°
    // 分钟的旋转角度 每分钟 30°/60分钟 = 0.5°
    rotate += minute.value * 0.5
    return `transform: translate(-50%, -80%) rotate(${rotate}deg);`
})
const minuteStyle = computed(() => {
    const rotate = minute.value * 6;
    return `transform: translate(-50%, -80%) rotate(${rotate}deg);`
    
})
</script>
<style lang="scss">
.clock {
    @apply select-none;
    @apply pb-100%;
    @apply relative;
    @apply overflow-hidden;
    @apply border-2 border-black rounded-full;
}

@mixin notch($num) {
    height: 110%;
    @apply border-2 border-black;
    @apply absolute top-50% left-50% z-3;
    transform: translate(-50%, -50%) rotate($num * 30deg);
}
.notch {
    @apply absolute inset-0;
    @apply p-5%;
    .cover {
        background-color: #fff;
        width: 100%;
        height: 100%;
        z-index: 4;
        position: relative;
        border-radius: 100%;
    }
    &_1 {
        @include notch(1);
    }
    &_2 {
        @include notch(2);
    }
    &_3 {
        @include notch(3);
    }
    &_4 {
        @include notch(4);
    }
    &_5 {
        @include notch(5);
    }
    &_6 {
        @include notch(6);
    }
}

@mixin dot($num) {
    height: 110%;
    @apply border-1 border-cool-gray-400;
    @apply absolute top-50% left-50% z-1;
    transform: translate(-50%, -50%) rotate($num * 6deg);
}
.dot {
    @apply absolute inset-0;
    @apply p-3%;
    .cover {
        background-color: #fff;
        width: 100%;
        height: 100%;
        z-index: 2;
        position: relative;
        border-radius: 100%;
    }
    &_1 {
        @include dot(1);
    }
    &_2 {
        @include dot(2);
    }
    &_3 {
        @include dot(3);
    }
    &_4 {
        @include dot(4);
    }

    &_6 {
        @include dot(6);
    }
    &_7 {
        @include dot(7);
    }
    &_8 {
        @include dot(8);
    }
    &_9 {
        @include dot(9);
    }

    &_11 {
        @include dot(11);
    }
    &_12 {
        @include dot(12);
    }
    &_13 {
        @include dot(13);
    }
    &_14 {
        @include dot(14);
    }

    &_16 {
        @include dot(16);
    }
    &_17 {
        @include dot(17);
    }
    &_18 {
        @include dot(18);
    }
    &_19 {
        @include dot(19);
    }

    &_21 {
        @include dot(21);
    }
    &_22 {
        @include dot(22);
    }
    &_23 {
        @include dot(23);
    }
    &_24 {
        @include dot(24);
    }
    &_26 {
        @include dot(26);
    }
    &_27 {
        @include dot(27);
    }
    &_28 {
        @include dot(28);
    }
    &_29 {
        @include dot(29);
    }
    &_31 {
        @include dot(31);
    }
    &_32 {
        @include dot(32);
    }
    &_33 {
        @include dot(33);
    }
    &_34 {
        @include dot(34);
    }
}

@mixin number($num) {
    transform: translate(-50%, -50%);
}
@mixin number($num) {
    transform: translate(-50%, -50%) rotate($num * 30deg);
    span {
        transform: rotate($num * -30deg);
    }
}
.number {
    @apply absolute inset-5%;
    div {
        @apply h-full text-center;
        @apply flex flex-col justify-between;
        @apply absolute top-50% left-50% z-5;
    }
    &_1 {
        @include number(1);
    }
    &_2 {
        @include number(2);
    }
    &_3 {
        @include number(3);
    }
    &_4 {
        @include number(4);
    }
    &_5 {
        @include number(5);
    }
    &_6 {
        @include number(6);
    }
}

.hour {
    width: 0;
    height: 25%;
    @apply border-2 border-black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 80%;
    transform: translate(-50%, -80%) rotate(60deg);
    z-index: 7;
}
.minute {
    width: 0;
    height: 40%;
    @apply border-1 border-black;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 80%;
    transform: translate(-50%, -80%) rotate(30deg);
    z-index: 6;
}
.center {
    @apply w-0 h-0 overflow-hidden;
    @apply border-5 border-black rounded-full;
    @apply absolute top-50% left-50% z-35;
    transform: translate(-50%, -50%);
}
</style>
