<script lang="ts">
    // 运算方式
    const methods = {
        add: '加法',
        sub: '减法',
        add_sub: '加减法'
    }
    let currentMethod = localStorage.getItem('currentMethod') || 'add'
    $: localStorage.setItem('currentMethod', currentMethod)

    // 运算范围
    const ranges = [10, 20, 50, 100]
    let currentRange = localStorage.getItem('currentRange')
        ? parseInt(localStorage.getItem('currentRange'))
        : 10
    $: localStorage.setItem('currentRange', currentRange.toString())

    let rules: string[] = localStorage.getItem('rules')
        ? JSON.parse(localStorage.getItem('rules'))
        : [] // 规则
    $: {
        // 减法或10以内时，不涉及进位
        if (currentMethod === 'sub' || currentRange === 10) {
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
    }

    // 为了美观对齐, 补空数量
    $: padStartLen = (currentRange - 1).toString().length

    let resLen: number = 60 // 生成数量 60正好一页a4纸
    let res = [] // 结果

    // 标题
    $: {
        document.title = `${currentRange}以内${methods[currentMethod]}`
    }

    // 生成随机数
    const random = (min: number = 0, max: number = currentRange): number => {
        return Math.round(Math.random() * (max - min)) + min
    }

    // 加法
    const handleAdd = () => {
        if (rules.includes('addCarry')) {
            // 可进位
            let a = random()
            let b = random(0, currentRange - a)
            return [a, '+', b]
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
        return [parseInt(aArr.join('')), '+', parseInt(bArr.join(''))]
    }
    // 减法
    const handleSub = () => {
        const a = random()

        // 如果a小于10， 不会有退位的问题
        // 直接生成一个比a小的即可。
        if (a < 10) {
            let b = random(0, a)
            return [a, '-', b]
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
            return [a, '-', parseInt(bArr.join(''))]
        }

        // 不退位， 循环每一位，保证不大于a
        rangeStr.forEach((item, index) => {
            const b = random(0, parseInt(item))
            bArr.push(b)
        })
        return [a, '-', parseInt(bArr.join(''))]
    }

    const submit = () => {
        let total = []
        switch (currentMethod) {
            case 'add': // 加法
                for (let i = 0; i < resLen; i++) {
                    const item = handleAdd()
                    total.push(item)
                }
                break

            case 'sub': // 减法
                for (let i = 0; i < resLen; i++) {
                    const item = handleSub()
                    total.push(item)
                }
                break

            case 'add_sub': // 加减法
                for (let i = 0; i < resLen; i++) {
                    const dice = random(0, 2)
                    const item = dice ? handleAdd() : handleSub()
                    total.push(item)
                }
        }
        res = total
    }

    const print = () => {
        window.print()
    }
</script>

<div class="flex flex-wrap items-center justify-center my-10 print:hidden">
    <div class="m-4 whitespace-nowrap">
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
    <div class="m-4 whitespace-nowrap">
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
    <div class="m-4 whitespace-nowrap">
        <strong>规则：</strong>
        <span>
            <input
                id="addCarry"
                class="peer"
                type="checkbox"
                disabled={['sub'].includes(currentMethod) ||
                    currentRange === 10}
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
    </div>
    <div class="m-4 whitespace-nowrap">
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
    </div>
</div>
<div
    class="container max-w-[800px] flex-grow flex-shrink-0 mx-auto p-12 shadow bg-white text-xl grid sm:grid-cols-2 md:grid-cols-4
        print:p-0 print:shadow-none print:grid-cols-4"
    style="font-family: consolas;"
>
    {#each res as item, index}
        <pre class="flex items-center justify-center ">
<span class="text-xs text-gray-400 mr-2">{index + 1}.</span>{item?.[0]
                .toString()
                .padStart(padStartLen) || 'a'} {item?.[1] || 'x'} {item?.[2]
                .toString()
                .padStart(padStartLen) || 'b'} = __</pre>
    {/each}
</div>
