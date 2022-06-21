<script lang="ts">
    import Router from 'svelte-spa-router'
    import routes from './routes'
</script>

<main>
    <ul>
        <li><a href="#/">首页</a></li>
        <li><a href="#/addSub/">加减法</a></li>
        <li>分成图</li>
        <li>比大小</li>
    </ul>
    <Router {routes} />
</main>
