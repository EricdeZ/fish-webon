<script>
    import './global.scss';
    import {onMount} from "svelte";

    import {data} from "../stores/data.js";
    import {fish_contract} from "../stores/fish_contract.js";
    import cross from "../assets/x_black.svg";
    import {injectNomoCSSVariables, nomo} from "nomo-webon-kit";
    import {ethers} from "ethers";
    import {fish_address} from "../utils/constants.js";
    import {abi} from "../abi/contracts_Fish_sol_Fish.json";
    import {zscProvider, zscSigner} from "ethersjs-nomo-webons";

    let loading = true
    let error = false

    onMount(async () => {
        await injectNomoCSSVariables();
        $data.address = await nomo.getEvmAddress()
        $fish_contract.signer = new ethers.Contract(fish_address, abi, zscSigner);
        $fish_contract.provider = new ethers.Contract(fish_address, abi, zscProvider);
        $data.is_owner = (await $fish_contract.provider.owner()) === $data.address
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
