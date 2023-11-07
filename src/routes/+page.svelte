<script>
    import fish from "../assets/fish.webp"
    import zeniq from "../assets/zeniq.png"
    import {ethers, formatUnits} from "ethers";
    import {fish_address} from "../utils/constants.js";
    import {nomo} from "nomo-webon-kit";
    import {getTx} from "../utils/functions.js";
    import {onMount} from "svelte";
    import {fish_contract} from "../stores/fish_contract.js";
    import {zscProvider} from "ethersjs-nomo-webons";
    import {data} from "../stores/data.js";
    import Donators from "../components/Donators.svelte";

    let feed_amount = ""
    let alias = ""
    let balance = {
        fish: "",
        zeniq: ""
    }

    let loading = {
        buy: false,
        add: false,
        feed: false,
        payout: false
    }

    const addCustomToken = async () => {
        loading.add = true
        try {
            await nomo.addCustomToken({
                contractAddress: fish_address,
                network: 'zeniqSmartChain',
            })
            loading.add = false
        } catch (e) {
            loading.add = false
            console.log(e)
        }
    }

    const buyFish = async () => {
        loading.buy = true
        const tx = await $fish_contract.signer.buy({value: ethers.parseEther("1.0"), ...await getTx()});
        const receipt = await tx.wait()
        console.log(receipt)
        await fetchBalances()
        loading.buy = false
    }

    const feedFish = async (alias, donation) => {
        loading.feed = true
        const tx = await $fish_contract.signer.donate(alias, {value: ethers.parseEther(donation.toString()), ...await getTx()});
        const receipt = await tx.wait()
        console.log(receipt)
        await fetchBalances()
        loading.feed = false
    }

    const payout = async () => {
        loading.payout = true
        const tx = await $fish_contract.signer.payout(await getTx());
        const receipt = await tx.wait()
        console.log(receipt)
        await fetchBalances()
        loading.payout = false
    }

    const fetchBalances = async () => {
        balance.zeniq = Number(formatUnits(await zscProvider.getBalance("0x15686f45f6143334cf79f808D0eC04914541997F"), 18)).toFixed(2)
        balance.fish = await $fish_contract.provider.balanceOf("0x15686f45f6143334cf79f808D0eC04914541997F")
    }

    onMount(async () => {
        await fetchBalances()
    })

</script>

<div class="page">
    <div class="balance-container">
        {#if balance.fish}
            <div class="balance">
                <span>{balance.fish}</span>
                <img src={fish} alt="">
            </div>
        {/if}
        {#if balance.zeniq}
            <div class="balance">
                <span>{balance.zeniq}</span>
                <img src={zeniq} alt="">
            </div>
        {/if}
    </div>
    <div class="main-container">
        <button on:click={async () => {
        await buyFish()
    }}>
            <img src={fish} alt="">
            {#if loading.buy}
                <span>LOADING</span>
            {:else}
                <span>BUY YOUR FISH</span>
            {/if}
            <img src={fish} alt="">
        </button>
        <button on:click={async () => {
         await addCustomToken()
    }}>
            <img src={fish} alt="">
            {#if loading.add}
                <span>LOADING</span>
            {:else}
                <span>TRACK FISH IN YOUR WALLET</span>
            {/if}
            <img src={fish} alt="">
        </button>
        {#if $data.is_owner}
            <button on:click={async () => {
         await payout()
    }}>
                <img src={fish} alt="">
                {#if loading.payout}
                    <span>LOADING</span>
                {:else}
                    <span>PAYOUT</span>
                {/if}
                <img src={fish} alt="">
            </button>
        {/if}
        <div class="feed-container">
            <div class="input-container">
                <input type="text" bind:value={alias} placeholder="Alias"/>
                <input type="number" bind:value={feed_amount} placeholder="1.0"/>
            </div>
            <button on:click={async () => {
            await feedFish(alias, feed_amount)
        }}>
                <img src={fish} alt="">
                {#if loading.feed}
                    <span>LOADING</span>
                {:else}
                    <span>FOR THE FISH</span>
                {/if}
                <img src={fish} alt="">
            </button>
        </div>
    </div>
    <div>
        <Donators/>
    </div>
    <button on:click={() => location.reload()}>Reload</button>
</div>

<style lang="scss">
    .page {
        justify-content: space-between;
        gap: 20px;
        max-width: min(90%, 600px);
        padding: 20px 0;
        min-height: 100vh;
      > div {
        width: 100%;
      }
    }
    .main-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .balance-container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .balance {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        border: 2px solid #487cc3;
        border-radius: 20px;
        background: #d6e2ef;
        padding: 20px;
    }

    img {
        width: 40px;
    }

    .feed-container {
        margin: 20px 0;
        width: 100%;
        .input-container {
          display: flex;
          gap: 10px;
          input:nth-child(2) {
            width: 100px;
          }
          input {
            margin: 0 0 5px 0;
            border: 2px solid #487cc3;
            border-radius: 20px;
            padding: 20px;
            width: 100%;
            &:focus {
              outline: none;
            }
          }
        }
    }
</style>
