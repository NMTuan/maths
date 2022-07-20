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
    // 参与运算的个数
    let num = localStorage.getItem('num')
        ? JSON.parse(localStorage.getItem('num'))
        : 2
    $: {
        localStorage.setItem('num', num.toString())
        clearRes()
    }

    // 规则
    let rules: string[] = localStorage.getItem('rules')
        ? JSON.parse(localStorage.getItem('rules'))
        : []
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

    let resLen: number = localStorage.getItem('resLen')
        ? parseInt(localStorage.getItem('resLen'))
        : 50 // 生成数量
    $: {
        clearRes()
        localStorage.setItem('resLen', resLen.toString())
    }
    let res = [] // 结果
    let showRes = false // 是否显示结果

    let qrcodeDivLen = 3 // 补齐div数量， 保证二维码在最右侧
    $: {
        qrcodeDivLen = 3 - (res.length % 3) + 1
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
        let numbers = []
        if (rules.includes('addCarry')) {
            // 可进位
            while (numbers.length < num) {
                numbers.push(random(1))
            }
        } else {
            // 不进位
            const rangeStr = (currentRange - 1).toString().split('') // 一共几位
            const results = [] // 临时结果 [[1,2], [3,4]] 第一个数的十位/个位; 第二个数的十位/个位;
            while (results.length < num) {
                results.push([])
            }
            rangeStr.forEach((item, index) => {
                let total = 0 // 记录一下前面生成的和, 保证下一个数不大于(最大值-和)
                // 循环每一位，保证不进位
                for (let i = 0; i < num; i++) {
                    const a = random(0, parseInt(item) - total)
                    total += a
                    results[i].push(a)
                }
            })
            // 把临时结果内每一个数的每一位拼接起来.
            numbers = results.reduce((total, item) => {
                total.push(parseInt(item.join('')))
                return total
            }, [])
        }
        const methods = [] // 运算符, 保证比numbers小1即可. 没有写死是为了后续的混合运算.
        while (methods.length < numbers.length - 1) {
            methods.push(0)
        }
        return {
            numbers, // 参与计算的数
            methods, // 各个数字之间的运算符
            result: numbers.reduce((total, number) => total + number, 0) // 计算结果
        }
    }
    // 减法
    const handleSub = () => {
        const a = random()
        let numbers = []

        const rangeStr = a.toString().split('') // 一共几位
        if (rules.includes('subBack')) {
            // 可退位, 保证b比a小即可
            let total = a
            numbers.push(a)
            for (var i = 0; i < num - 1; i++) {
                const b = random(0, total - 1)
                total = total - b
                numbers.push(b)
            }
        } else {
            // 不退位， 循环每一位，保证不大于a
            const results = [] // 临时结果 [[1,2], [3,4]] 第一个数的十位/个位; 第二个数的十位/个位;
            // 这里-1是因为a已经生成了.
            while (results.length < num - 1) {
                results.push([])
            }
            rangeStr.forEach((item, index) => {
                let total = parseInt(item)
                // 这里-1是因为a已经生成了.
                for (let i = 0; i < num - 1; i++) {
                    const b = random(0, total)
                    // 不退位
                    total -= b
                    results[i].push(b)
                }
            })
            // 把临时结果内每一个数的每一位拼接起来.
            numbers = results.reduce(
                (total, item) => {
                    total.push(parseInt(item.join('')))
                    return total
                },
                [a]
            )
        }

        const methods = [] // 运算符, 保证比numbers小1即可. 没有写死是为了后续的混合运算.
        while (methods.length < numbers.length - 1) {
            methods.push(1)
        }

        return {
            numbers,
            methods,
            result: numbers.reduce((total, number) => {
                if (total === 0) {
                    total = number
                } else {
                    total = total - number
                }
                return total
            }, 0) // 计算结果
        }
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
            if (newItem.numbers.includes(0)) {
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
            qrcodeRes.push(item.result.toString(36).padStart(2, '_'))
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
            let time = 0
            while (newItem === undefined && time < 100) {
                time++
                const _item = generator()
                const exist = res.some((item) => {
                    return JSON.stringify(item) === JSON.stringify(_item)
                })
                if (!exist && !_item.numbers.includes(0)) {
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
        <strong>运算数：</strong>
        {num}
        <input type="range" min="2" max="4" bind:value={num} />
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
    <div class="mx-4 my-2 whitespace-nowrap flex items-center" />
</div>
<div
    class="text-center mb-6
print:hidden"
>
    <span>
        <strong>题数：</strong>
        {resLen}
        <input
            type="range"
            name="points"
            min="1"
            max="50"
            bind:value={resLen}
        />
    </span>
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
    class="relative container max-w-[800px] overflow-hidden mx-auto p-12 pb-20 bg-white"
>
    <div
        class="flex-grow flex-shrink-0 text-xl grid sm:grid-cols-2 md:grid-cols-3
        print:p-0 print:shadow-none print:grid-cols-3"
        style="font-family: consolas;"
    >
        {#each res as item, index}
            <div class="flex items-center mb-6.5 group">
                <span class="text-xs text-gray-400 mr-2"
                    >{(index + 1).toString().padStart(2, '0')}.</span
                >
                {#each item.numbers as number, i}
                    {number}{item.methods[i] !== undefined
                        ? operator[item.methods[i]] + ''
                        : ''}{/each} = {showRes ? item.result : '____'}
                <!-- 10以内加法就36个，没法刷 -->
                {#if !(currentRange === 10 && currentMethod === 'add')}
                    <span
                        class="invisible cursor-pointer text-xs
                group-hover:visible print:hidden ml-2"
                        on:click={() => refresh(index)}
                        title="重新生成本题"
                    >
                        <IconRefresh />
                    </span>
                {/if}
            </div>
        {/each}
        {#if qrcodeStr}
            <!-- {#each Array(qrcodeDivLen) as item, index}
                <div />
            {/each} -->
            <!-- <div class=" text-right self-center text-base pr-8">扫一扫 查答案</div>
        <div class="">
            <Qrcode value={qrcodeStr} size="110" />
        </div> -->
        {/if}
    </div>
    <div>
        <div class="flex items-center absolute right-0 bottom-0">
            <div>扫一扫 查答案 &nbsp;</div>
            <Qrcode value={qrcodeStr} size="150" />
        </div>
    </div>
</div>
