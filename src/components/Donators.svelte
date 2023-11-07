<script>
    import zeniq from "../assets/zeniq.png"
    import {formatEther} from "ethers";
    import {onMount} from "svelte";
    import {fish_contract} from "../stores/fish_contract.js";

    let loading = {
        donations: true,
        donators: true
    }

    let donations = 0
    let donators = []

    const getDonators = async () => {
        loading.donators = true
        donators.push(await $fish_contract.provider.donations(0))
        donators.push(await $fish_contract.provider.donations(1))
        donators.push(await $fish_contract.provider.donations(2))
        loading.donators = false
    }

    onMount(async () => {
        $fish_contract.provider.on("Donate", async () => {
            donations = formatEther((await $fish_contract.provider.donators("0x15686f45f6143334cf79f808D0eC04914541997F")).amount)
            donators.pop()
            donators.pop()
            donators.pop()
            donators.push(await $fish_contract.provider.donations(0))
            donators.push(await $fish_contract.provider.donations(1))
            donators.push(await $fish_contract.provider.donations(2))
            donators = donators
        });
        donations = formatEther((await $fish_contract.provider.donators("0x15686f45f6143334cf79f808D0eC04914541997F")).amount)
        loading.donations = false
        donators.push(await $fish_contract.provider.donations(0))
        donators.push(await $fish_contract.provider.donations(1))
        donators.push(await $fish_contract.provider.donations(2))
        loading.donators = !(!!donators[0]?.name)
    })

</script>

{#if !loading.donations}
    <div class="container">
        <div class="donations">
            <span>You fed the fish with</span>
            <div>
                <span>{donations}</span>
                <img src={zeniq} alt="">
            </div>
        </div>
    </div>
{/if}

{#if !loading.donators}
    <div class="container">
        Top Feeders
        {#each donators as donator}
            {#if donator.name}
                <div class="donator">
                    <span>{donator.name}</span>
                    <div>
                        <span>{formatEther(donator.amount)}</span>
                        <img src={zeniq} alt="">
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}



<style lang="scss">
  .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    margin: 20px 0;
  }
  .donations {
    display: flex;
    max-width: 100%;
    width: 100%;
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border: 2px solid #487cc3;
    border-radius: 20px;
    background: #d6e2ef;
    padding: 20px;
    div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
    }
    img {
      width: 30px;
    }
  }
  .donator {
    display: flex;
    max-width: 100%;
    width: 100%;
    margin: 5px 0;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border: 2px solid #487cc3;
    border-radius: 20px;
    background: #d6e2ef;
    padding: 20px;
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    img {
      width: 30px;
    }
  }
</style>
