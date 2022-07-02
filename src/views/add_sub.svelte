<script lang="ts">
    import Qrcode from '../components/Qrcode.svelte'
    import IconRefresh from '../components/icon/Refresh.svelte'
    let qrcodeStr = '' // 二维码内容
    // 运算方式
    const methods = {
        add: '加法',
        sub: '减法',
        add_sub: '加减法'
    }
    let currentMethod = localStorage.getItem('currentMethod') || 'add'
    $: {
        localStorage.setItem('currentMethod', currentMethod)
        clearRes()
    }

    // 运算符
    const operator = ['+', '-']
    // 运算范围
    const ranges = [10, 20, 50, 100]
    let currentRange = localStorage.getItem('currentRange')
        ? parseInt(localStorage.getItem('currentRange'))
        : 10
    $: {
        localStorage.setItem('currentRange', currentRange.toString())
        clearRes()
    }

    let rules: string[] = localStorage.getItem('rules')
        ? JSON.parse(localStorage.getItem('rules'))
        : [] // 规则
    $: {
        // 减法或10以内时，不涉及进位
        if (currentMethod === 'sub') {
            rules = rules.filter((role) => role !== 'addCarry')
        }
    }
    $: {
        // 加法或10以内时，不涉及退位
        if (currentMethod === 'add' || currentRange === 10) {
            rules = rules.filter((role) => role !== 'subBack')
        }
    }
    $: {
        localStorage.setItem('rules', JSON.stringify(rules))
        clearRes()
    }

    // 为了美观对齐, 补空数量
    $: padStartLen = (currentRange - 1).toString().length

    let resLen: number = localStorage.getItem('resLen')
        ? parseInt(localStorage.getItem('resLen'))
        : 50 // 生成数量 60正好一页a4纸
    $: {
        clearRes()
        localStorage.setItem('resLen', resLen.toString())
    }
    let res = [] // 结果
    let showRes = false // 是否显示结果

    let qrcodeDivLen = 4 // 补齐div数量， 保证二维码在最右侧
    $: {
        qrcodeDivLen = 4 - (res.length % 4) + 2
    }

    // 标题
    $: {
        document.title = `${currentRange}以内${methods[currentMethod]}`
    }

    // 生成随机数
    const random = (min: number = 0, max: number = currentRange): number => {
        return Math.round(Math.random() * (max - min)) + min
    }

    // 清除结果
    const clearRes = () => {
        res = []
        qrcodeStr = ''
    }

    // 加法
    const handleAdd = () => {
        if (rules.includes('addCarry')) {
            // 可进位
            let a = random(1)
            let b = random(1)
            return [0, a, b, a + b]
        }
        // 不进位
        const rangeStr = (currentRange - 1).toString().split('') // 一共几位
        const aArr = []
        const bArr = []
        rangeStr.forEach((item, index) => {
            // 循环每一位，保证不进位
            const a = random(0, parseInt(item))
            const b = random(0, parseInt(item) - a)
            aArr.push(a)
            bArr.push(b)
        })
        return [
            0,
            parseInt(aArr.join('')),
            parseInt(bArr.join('')),
            parseInt(aArr.join('')) + parseInt(bArr.join(''))
        ]
    }
    // 减法
    const handleSub = () => {
        const a = random()

        // 如果a小于10， 不会有退位的问题
        // 直接生成一个比a小的即可。
        if (a <= 10) {
            let b = random(0, a)
            return [1, a, b, a - b]
        }

        const bArr = []
        const rangeStr = a.toString().split('') // 一共几位

        if (rules.includes('subBack')) {
            // 可退位， 循环每一位，保证除了个位外，不大于a-1
            rangeStr.forEach((item, index) => {
                let b = 0
                if (index === rangeStr.length - 1) {
                    b = random(0, 9)
                } else {
                    b = random(0, parseInt(item) - 1)
                }
                bArr.push(b)
            })
        } else {
            // 不退位， 循环每一位，保证不大于a
            rangeStr.forEach((item, index) => {
                const b = random(0, parseInt(item))
                bArr.push(b)
            })
        }

        return [1, a, parseInt(bArr.join('')), a - parseInt(bArr.join(''))]
    }

    // 生成一道题
    const generator = () => {
        let item
        switch (currentMethod) {
            case 'add': // 加法
                item = handleAdd()
                break

            case 'sub': // 减法
                item = handleSub()
                break

            case 'add_sub': // 加减法
                const dice = random(0, 2)
                item = dice ? handleAdd() : handleSub()
        }
        return item
    }

    const submit = () => {
        let total = []
        let time = 0 // 约定最大循环次数，防止页面无响应。
        while (total.length < resLen && time < 999) {
            time++
            const newItem = generator()

            // 过滤0
            if (newItem[1] === 0 || newItem[2] === 0) {
                continue
            }

            // 不重复
            if (!rules.includes('repeat')) {
                total = total.filter((item) => {
                    return JSON.stringify(item) !== JSON.stringify(newItem)
                })
            }

            total.push(newItem)
        }

        res = total
        handleQrode()
    }

    const handleQrode = () => {
        const qrcodeRes = []
        res.forEach((item) => {
            qrcodeRes.push(item[3].toString(36).padStart(2, '_'))
        })
        qrcodeStr =
            location.href +
            (location.hash === '' ? '#/' : '') +
            qrcodeRes.join('')
    }

    const print = () => {
        window.print()
    }

    // 单题刷新
    const refresh = (index) => {
        if (rules.includes('repeat')) {
            res[index] = generator()
        } else {
            let newItem
            while (newItem === undefined) {
                const _item = generator()
                const exist = res.some((item) => {
                    return JSON.stringify(item) === JSON.stringify(_item)
                })
                if (!exist) {
                    newItem = _item
                }
            }
            res[index] = newItem
        }
        handleQrode()
    }
</script>

<div class="flex flex-wrap items-center justify-center my-6 print:hidden">
    <div class="mx-4 my-2 whitespace-nowrap flex items-center">
        <strong>范围：</strong>
        {#each ranges as range, index}
            <span>
                <input
                    id={`range${index}`}
                    class="peer"
                    type="radio"
                    bind:group={currentRange}
                    value={range}
                />
                <label
                    for={`range${index}`}
                    class="peer-checked:text-sky-500 peer-checked:font-bold"
                >
                    {range}
                </label>
            </span>
        {/each}
    </div>
    <div class="mx-4 my-2 whitespace-nowrap flex items-center">
        <strong>运算：</strong>
        {#each Object.keys(methods) as key, index}
            <span>
                <input
                    id={`method${index}`}
                    class="peer"
                    type="radio"
                    bind:group={currentMethod}
                    value={key}
                />
                <label
                    for={`method${index}`}
                    class="peer-checked:text-sky-500 peer-checked:font-bold"
                >
                    {methods[key]}
                </label>
            </span>
        {/each}
    </div>
    <div class="mx-4 my-2 whitespace-nowrap flex items-center">
        <strong>规则：</strong>
        <span>
            <input
                id="addCarry"
                class="peer"
                type="checkbox"
                disabled={['sub'].includes(currentMethod)}
                value="addCarry"
                bind:group={rules}
            />
            <label
                for="addCarry"
                class="peer-checked:text-sky-500 peer-checked:font-bold
                peer-disabled:text-gray-400
                "
            >
                可进位
            </label>
        </span>
        <span>
            <input
                id="subBack"
                class="peer"
                type="checkbox"
                disabled={['add'].includes(currentMethod) ||
                    currentRange === 10}
                value="subBack"
                bind:group={rules}
            />
            <label
                for="subBack"
                class="peer-checked:text-sky-500 peer-checked:font-bold
                peer-disabled:text-gray-400
                "
            >
                可退位
            </label>
        </span>
        <span>
            <input
                id="repeat"
                class="peer"
                type="checkbox"
                value="repeat"
                bind:group={rules}
            />
            <label
                for="repeat"
                class="peer-checked:text-sky-500 peer-checked:font-bold
                peer-disabled:text-gray-400
                "
            >
                可重复
            </label>
        </span>
    </div>
    <div class="mx-4 my-2 whitespace-nowrap flex items-center">
        <strong>题数：</strong>
        <input
            type="range"
            name="points"
            min="1"
            max="50"
            bind:value={resLen}
        />
        {resLen}
    </div>
</div>
<div
    class="text-center mb-6
print:hidden"
>
    <button
        class="bg-sky-500 border-none text-white px-4 py-1 cursor-pointer
            hover:bg-sky-400
            "
        on:click={submit}>生成</button
    >
    <button
        class="bg-sky-500 border-none text-white px-4 py-1 cursor-pointer
            hover:bg-sky-400
            disabled:bg-neutral-400 disabled:text-neutral-200 disabled:cursor-not-allowed
            disabled:hover:bg-neutral-400
            "
        disabled={res.length === 0}
        on:click={print}>打印</button
    >
    <span>
        <input
            id="showRes"
            class="peer"
            type="checkbox"
            on:change={(e) => (showRes = e.currentTarget.checked)}
        />
        <label
            for="showRes"
            class="peer-checked:text-sky-500 peer-checked:font-bold
                peer-disabled:text-gray-400
                "
        >
            显示结果
        </label>
    </span>
</div>
<div
    class="relative container max-w-[800px] flex-grow flex-shrink-0 mx-auto p-12 shadow bg-white text-xl grid sm:grid-cols-2 md:grid-cols-4
        print:p-0 print:shadow-none print:grid-cols-4"
    style="font-family: consolas;"
>
    {#each res as item, index}
        <pre class="flex items-center justify-center group">
<span class="text-xs text-gray-400 mr-2">{index + 1}.</span>{item?.[1]
                .toString()
                .padStart(padStartLen) || 'a'} {operator[item?.[0]] ||
                'x'} {item?.[2].toString().padStart(padStartLen) ||
                'b'} = {showRes
                ? item?.[3].toString().padStart(padStartLen)
                : '__'} <span
                class="invisible cursor-pointer text-xs
                group-hover:visible print:hidden"
                on:click={() => refresh(index)}
                title="重新生成本题"><IconRefresh /></span
            ></pre>
    {/each}
    {#if qrcodeStr}
        {#each Array(qrcodeDivLen) as item, index}
            <div />
        {/each}
        <div class=" justify-self-center self-center text-base">
            扫一扫 查答案
        </div>
        <div class="justify-self-center">
            <Qrcode value={qrcodeStr} size="150" />
        </div>
    {/if}
</div>
