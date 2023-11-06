<script>
    import fish from "../assets/fish.webp"
    import {ethers, formatUnits} from "ethers";
    import {fish_address} from "../utils/constants.js";
    import {nomo} from "nomo-webon-kit";
    import {getTx} from "../utils/functions.js";
    import {onMount} from "svelte";
    import {fish_contract} from "../stores/fish_contract.js";
    import {zscSigner} from "ethersjs-nomo-webons";

    let feed_amount = ""
    let balance = null

    const addCustomToken = async () => {
        try {
            await nomo.addCustomToken({
                contractAddress: fish_address,
                network: 'zeniqSmartChain',
            })
        } catch (e) {
            console.log(e)
        }
    }

    const buyFish = async () => {
        const tx = await $fish_contract.buy({value: ethers.parseEther("1.0"), ...await getTx()});
        const receipt = await tx.wait()
        console.log(receipt)
    }

    const feedFish = async () => {
        const tx = await $fish_contract.donate(getTx("0.05"));
        const receipt = await tx.wait()
        console.log(receipt)
    }

    const payout = async () => {
        // const tx = await $fish_contract["payout(uint256)"](1)
        const tx = await zscSigner.sendTransaction({
            to: fish_address,
            data: "0xe11523430000000000000000000000000000000000000000000000000000000000000001",
            ...await getTx()
        })
        const receipt = await tx.wait()
        console.log(receipt)
    }

    onMount(async () => {
        balance = formatUnits(await $fish_contract.balanceOf(await nomo.getEvmAddress()))
    })

</script>

<div class="page">
    {#if balance}
        <div class="balance">
            <span>{balance}</span>
            <img src={fish} alt="">
        </div>
    {/if}
    <button on:click={async () => {
        await buyFish()
    }}>
        <img src={fish} alt="">
        <span>BUY YOUR FISH</span>
        <img src={fish} alt="">
    </button>
    <button on:click={async () => {
         await addCustomToken()
    }}>
        <img src={fish} alt="">
        <span>TRACK FISH IN YOUR WALLET</span>
        <img src={fish} alt="">
    </button>
    <button on:click={async () => {
         await payout()
    }}>
        <img src={fish} alt="">
        <span>PAYOUT</span>
        <img src={fish} alt="">
    </button>
    <div class="feed-container">
        <input type="number" bind:this={feed_amount} placeholder="1.0"/>
        <button on:click={async () => {
            await feedFish(feed_amount)
        }}>
            <img src={fish} alt="">
            <span>FOR THE FISH</span>
            <img src={fish} alt="">
        </button>
    </div>
</div>
<button on:click={() => location.reload()}>Reload</button>

<style lang="scss">
    .page {
        justify-content: center;
        gap: 20px;
        max-width: min(90%, 600px);
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
</style>
