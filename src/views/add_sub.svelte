<script lang="ts">
    let addMethod: boolean = true // 加法
    let addCarry: string = '0' // 进位：0不 1进 2不限

    let subMethod: boolean = false //减法
    let subCarry: string = '0' // 退位：0不 1退 2不限

    let range: number[] = [0, 10] // 范围
    let rangeSelected: string = '10' // 范围选定值
    let resLen: number = 60 // 生成数量
    let res = [] // 结果

    $: addMethod === false && (addCarry = '0')
    $: subMethod === false && (subCarry = '0')
    $: range[1] = parseInt(rangeSelected)

    const submit = () => {
        if (!addMethod && !subMethod) {
            alert('请选择算法！')
            return
        }
        let total = []
        for (let i = 0; i < resLen; i++) {
            const item = handleAdd()
            console.log('item', item)
            total.push(item)
        }
        console.log(total)
        res = total
    }

    // 生成随机数
    const random = (min: number = range[0], max: number = range[1]): number => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    // 加法
    const handleAdd = () => {
        let a = random()
        let b = 0
        // if (addCarry === '2') {
        b = random()
        // } else {
        //     const max = range[1] - 1
        //     const maxStr = max.toString().split('')
        //     console.log(max, maxStr)
        //     b = random(range[0], range[1] - a)
        // }

        return [a, '+', b]
    }
</script>

<main class="flex container">
    <div class="print:hidden">
        <p>加减法</p>
        <p>加法，范围，进位</p>
        <p>减法，范围，退位</p>
        <h2>配置规则</h2>
        <div>
            addMethod：{addMethod}
        </div>
        <div>
            subMethod：{subMethod}
        </div>
        <div>{range}</div>
        <div>
            <select name="" bind:value={rangeSelected}>
                <option value="10">10以内</option>
                <option value="20">20以内</option>
                <option value="100">100以内</option>
            </select>
        </div>
        <div>
            <label>
                <input bind:checked={addMethod} type="checkbox" /> 加法
            </label>
            <select bind:value={addCarry} disabled={!addMethod}>
                <option value="0">不进位</option>
                <option value="1">进位</option>
                <option value="2">不限</option>
            </select>
        </div>
        <div>
            <label>
                <input bind:checked={subMethod} type="checkbox" /> 减法
            </label>
            <select bind:value={subCarry} disabled={!subMethod}>
                <option value="0">不退位</option>
                <option value="1">退位</option>
                <option value="2">不限</option>
            </select>
        </div>
        <div>
            <button on:click={submit}>生成</button>
        </div>
    </div>
    <div
        class="flex-grow flex-shrink-0 max-w-[800px] mx-auto p-12 shadow bg-white text-xl  grid grid-cols-4
        print:p-0 print:shadow-none"
        style="font-family: consolas;"
    >
        {#each res as item, index}
            <pre class="whitespace-pre-wrap flex items-center justify-center	">
{item[0]
                    .toString()
                    .padStart(
                        (range[1] - 1).toString().length,
                        ' '
                    )} {item[1]} {item[2]
                    .toString()
                    .padStart(
                        (range[1] - 1).toString().length,
                        ' '
                    )} = ___</pre>
        {/each}
    </div>
    <div class="print:hidden">2</div>
</main>
