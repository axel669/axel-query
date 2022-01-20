<script>
    import {onMount} from "svelte"
    import {writable} from "svelte/store"

    import Card from "svelte-doric/core/card"
    import Grid from "svelte-doric/core/layout/grid"

    import vars from "svelte-doric/core/util/vars"

    export let label
    export let readonly = false
    export let area

    let editorArea = null
    let mirror = null
    let textTracker
    onMount(
        () => {
            const options = {
                lineNumbers: true,
                mode: "javascript",
                theme: "the-matrix",
                readOnly: readonly,
            }
            mirror = CodeMirror(editorArea, options)
            if (readonly === true) {
                return
            }
            mirror.setValue(
                localStorage["aqli:query"] ?? "{\n}"
            )
            textTracker = writable(mirror.getValue())
            textTracker.subscribe(
                (latest) => localStorage["aqli:query"] = latest
            )
            mirror.on(
                "change",
                () => $textTracker = mirror.getValue()
            )
        }
    )

    export const readText = () => {
        return mirror.getValue()
    }
    export const writeText = (text) => {
        mirror.setValue(text)
    }

    $: gridInfo = { area }
</script>

<style>
    code-wrapper {
        display: grid;
        position: relative;
    }

    div {
        display: grid;
        grid-area: var(--area);
    }

    editor-area {
        position: absolute;
        display: block;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: auto;
        overflow: auto;
    }
</style>

<div use:vars={gridInfo}>
    <Card color="secondary">
        <svelte:fragment slot="title">
            {label}
        </svelte:fragment>

        <code-wrapper>
            <editor-area bind:this={editorArea} />
        </code-wrapper>
    </Card>
</div>
