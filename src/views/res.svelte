<script lang="ts">
    import { link, replace } from 'svelte-spa-router'
    export let params = {
        resultString: '' // 传参
    }
    const resultArr = [] // 解析后的结果集

    document.title = '查看结果'

    // 分割位数组；2位合并；过滤补位的_；进制转换；
    const arr = params.resultString.split('')
    while (arr.length >= 2) {
        let item = arr.splice(0, 2).join('')
        item = item.replace('_', '')
        resultArr.push(parseInt(item, 36))
    }

    if (resultArr.length === 0) {
        alert('二维码异常')
        replace('/')
    }
</script>

<div
    class=" container max-w-[800px] flex-grow flex-shrink-0 mx-auto p-12 shadow bg-white text-3xl grid sm:grid-cols-2 md:grid-cols-4
        print:p-0 print:shadow-none print:grid-cols-4"
    style="font-family: consolas;"
>
    {#each resultArr as item, index}
        <pre class="flex items-center justify-center"><span
                class="text-base text-gray-400 mr-2">{index + 1}.</span
            >{item.toString().padStart(2)}</pre>
    {/each}
</div>
<div class="text-center">
    <a
        href="###"
        class="inline-block text-sky-500 p-4 no-underline"
        use:link={{ href: '/' }}
    >
        继续生成数学题
    </a>
</div>
