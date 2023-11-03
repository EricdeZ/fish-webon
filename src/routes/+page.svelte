<script>
    import fish from "../assets/fish.webp"
    import {zscSigner} from "ethersjs-nomo-webons";
    import {ethers} from "ethers";
    import {chainIdZeniqSmartChain, fish_address} from "../utils/constants.js";
    import abi from '../abi/contracts_Fish_sol_Fish.json'
    import {nomo} from "nomo-webon-kit";

    const acc1 = '0x15686f45f6143334cf79f808D0eC04914541997F'
    const acc2 = '0xfc8826ec9a88a8269F84988f0b6EC35bC21fc623'

    export async function getTx() {
        return {
            gasLimit: 21000,
            gasPrice: 10000000000,
            nonce: await zscSigner.getNonce(),
            chainId: chainIdZeniqSmartChain,
            type: 0,
        };
    }


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

</script>

<div class="page">
    <button on:click={async () => {
         const contract = new ethers.Contract(fish_address, abi, zscSigner);
         const tx = await contract.buy({ value: ethers.parseEther("1.0"), ...await getTx() });
         const receipt = await tx.wait()
         console.log(receipt)
    }}>
        <img src={fish} alt="">
    </button>
    <button on:click={async () => {
         await addCustomToken()
    }}>
        <img src={fish} alt="">
    </button>
</div>

<style>
    .page {
        justify-content: center;
        gap: 20px;
    }

    button {
        border: 2px solid #487cc3;
        background: #d6e2ef;
        padding: 40px;
        border-radius: 20px;
        aspect-ratio: 1;
    }

    img {
        width: 200px;
    }
</style>
