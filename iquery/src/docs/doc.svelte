<script>
    import ActionArea from "svelte-doric/core/action-area"
    import Button from "svelte-doric/core/button"
    import Card from "svelte-doric/core/card"
    import Icon from "svelte-doric/core/icon"
    import Grid from "svelte-doric/core/layout/grid"

    import HL from "./hl.svelte"

    export let name
    export let info

    let open = false

    $: icon = open ? "unfold_less" : "unfold_more"
</script>

<style>
    docs-view {
        display: none;
    }
    docs-view.open {
        display: flex;
        flex-direction: column;
        padding: 4px;
        gap: 4px;
    }

    flex-text {
        display: flex;
        align-items: center;
        padding-top: 4px;
        padding-bottom: 4px;
    }

    h-separator {
        display: block;
        width: 100%;
        border-top: 2px solid var(--text-normal);
    }

    title-area {
        display: grid;
        width: 100%;
    }
</style>

<Card color="primary">
    <title-area slot="title">
        <ActionArea on:tap={() => open = !open}>
            <flex-text>
                <Icon name={icon} />
                {name}
            </flex-text>
        </ActionArea>
    </title-area>

    <docs-view class:open>
        <HL label="Args" code={info.args} />
        <h-separator />
        <HL label="Return Value" code={info.value} />
    </docs-view>
</Card>
