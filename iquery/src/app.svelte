<script>
    import AppStyle from "svelte-doric/core/app-style"
    import baseline from "svelte-doric/core/baseline"
    import theme from "svelte-doric/core/theme/tron"

    import Adornment from "svelte-doric/core/adornment"
    import Button from "svelte-doric/core/button"
    import Drawer from "svelte-doric/core/drawer"
    import Icon from "svelte-doric/core/icon"
    import Spinner from "svelte-doric/core/circle-spinner"
    import TitleBar from "svelte-doric/core/title-bar"

    import Docs from "./docs.svelte"
    import CodeDisplay from "./code-display.svelte"

    const wait = (time) => new Promise(
        resolve => setTimeout(resolve, time)
    )
    const load = async () => {
        const res = await fetch("/aqli")
        const functions = await res.json()

        return functions
    }

    const functions = load()

    let queryArea = null
    let resultArea = null
    const run = async () => {
        const query = (new Function(`return ${queryArea.readText()}`))()
        console.log("executing:", query)
        resultArea.writeText("Running query...")
        const res = await fetch(
            "/aql",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query)
            }
        )
        const data = await res.json()

        resultArea.writeText(
            JSON.stringify(data, null, 2)
        )
    }

    let open = false
</script>

<style>
    app-layout {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-rows: min-content 1fr 1fr;
        grid-template-columns: auto 540px;
        grid-template-areas:
            "title title"
            "query docs"
            "results docs"
        ;
        gap: 4px;
    }

    title-area {
        display: grid;
        grid-area: title;
    }

    title-menu {
        display: flex;
        align-items: center;
        width: 46px;
        padding-left: 4px;
    }

    docs-view {
        display: grid;
        grid-area: docs;
    }

    :global(.CodeMirror) {
        height: 100%;
    }
</style>

<AppStyle {baseline} {theme} />

{#await functions}
    <Spinner />
{:then info}
    <app-layout>
        <title-area>
            <TitleBar sticky>
                Axel QueryI

                <svelte:fragment slot="adornments">
                    <Adornment position="menu">
                        <title-menu>
                            <Button on:tap={run} variant="outline" round="42px">
                                <Icon name="play_arrow" />
                            </Button>
                        </title-menu>
                    </Adornment>
                </svelte:fragment>
            </TitleBar>
        </title-area>
        <CodeDisplay label="Query" area="query" bind:this={queryArea} />
        <CodeDisplay label="Result" area="results" readonly bind:this={resultArea} />
        <docs-view>
            <Docs {info} />
        </docs-view>
    </app-layout>
{/await}
