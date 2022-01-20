<script>
    import Doc from "./docs/doc.svelte"

    export let info

    $: list = Object.entries(info)
</script>

<style>
    div {
        display: grid;
        grid-auto-rows: min-content;
        gap: 4px;
        overflow: auto;

        --card-background: var(--background);
    }

    function-title {
        background-color: var(--background);
        display: block;
        font-size: var(--text-size-header);
        padding: 4px;
        text-decoration: underline;

        position: sticky;
        top: 0px;
        z-index: +5;
    }
</style>

<div>
    <function-title>
        Available Functions
    </function-title>
    {#each list as [name, info]}
        <Doc {name} {info} />
    {/each}
</div>
