<script lang="ts">
    import Router from 'svelte-spa-router'
    import routes from './routes'
</script>

<main class=" relative">
    <!-- <div class="py-4 print:hidden">
        <ul class="flex list-none justify-center">
            <li class="mx-4">
                <a class="text-blue-500 no-underline hover:underline" href="#/">
                    首页
                </a>
            </li>
            <li class="mx-4">
                <a
                    class="text-blue-500 no-underline hover:underline"
                    href="#/addSub/"
                >
                    加减法
                </a>
            </li>
            <li class="mx-4">分成图</li>
            <li class="mx-4">比大小</li>
        </ul>
    </div> -->

    <Router {routes} />
</main>

<style>
    :root {
        margin: 0;
        padding: 0;
        background-color: #e2e2e2;
    }
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
