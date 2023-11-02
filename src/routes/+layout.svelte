<script>
    import './global.scss';
    import {onMount} from "svelte";

    import {data} from "../stores/data.js";
    import cross from "../assets/x_black.svg";
    import {injectNomoCSSVariables, nomo} from "nomo-webon-kit";

    let loading = true
    let error = false

    onMount(async () => {
        await injectNomoCSSVariables();
        $data.eth_addr = await nomo.getEvmAddress()
        loading = false
    })


</script>

<svelte:head>
    <title>🐟</title>
    <meta name="description" content="🐟"/>
</svelte:head>

{#if loading}
    <div class="loading">
        Loading...
    </div>
{:else}
    {#if error}
        <div class="error">
            <img src={cross} alt="">
            <div>{error}</div>
        </div>
    {:else}
        <slot/>
    {/if}
{/if}

<style lang="scss">
  .loading {
    padding: 30px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 20px;
    text-align: center;
  }

  .error {
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 30px;
    font-size: 20px;

    img {
      height: 70px;
    }
  }
</style>
