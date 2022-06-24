<script lang="ts">
    // 运算方式
    const methods = {
        add: '加法',
        sub: '减法',
        add_sub: '加减法'
    }
    let currentMethod = 'add'

    // 运算范围
    const ranges = [10, 20, 100]
    let currentRange = 10

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
        return Math.floor(Math.random() * (max - min)) + min
    }

    // 加法
    const handleAdd = () => {
        let a = random()
        let b = random()
        return [a, '+', b]
    }
    // 减法
    const handleSub = () => {
        let a = random()
        let b = random(0, a)
        return [a, '-', b]
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
</script>

<div class="flex justify-center my-10 print:hidden">
    <div class="mr-12">
        <strong>范围：</strong>
        {#each ranges as range}
            <label>
                <input type="radio" bind:group={currentRange} value={range} />
                {range} 以内
            </label>
        {/each}
    </div>
    <div class="mr-12">
        <strong>运算：</strong>
        {#each Object.keys(methods) as key}
            <label>
                <input type="radio" bind:group={currentMethod} value={key} />
                {methods[key]}
            </label>
        {/each}
    </div>
    <div class="mr-12">
        <button on:click={submit}>生成</button>
    </div>
</div>
<div
    class="flex-grow flex-shrink-0 max-w-[800px] mx-auto p-12 shadow bg-white text-xl  grid grid-cols-4
        print:p-0 print:shadow-none"
    style="font-family: consolas;"
>
    {#each res as item, index}
        <pre class="flex items-center justify-center">
{item[0].toString().padStart(padStartLen)} {item[1]} {item[2]
                .toString()
                .padStart(padStartLen)} = ___</pre>
    {/each}
</div>
