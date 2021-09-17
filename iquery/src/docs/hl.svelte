<script>
    import Flex from "svelte-doric/core/layout/flex"

    export let label
    export let code

    let elem = null

    $: json = JSON.stringify(code, null, 2)
    $: if (elem !== null) {
        hljs.highlightElement(elem)
    }
</script>

<style>
    div {
        text-decoration: underline;;
    }

    pre {
        margin: 0px;
    }
</style>

<Flex direction="column" padding="0px">
    <div>
        {label}
    </div>
    <pre class="json language-json" bind:this={elem}>{json}</pre>
</Flex>
