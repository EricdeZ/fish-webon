<script>
import {nomo} from "nomo-webon-kit";

let res = {}
</script>

Hello


<button on:click={async () => {
        try {
            res = await nomo.addCustomToken({
                contractAddress: '0xb38809246fe6c3e0C086E3db8dB9744c9375204d',
                network: 'ZENIQSMART'
            })
        } catch (e) {
            console.log(e)
            res = e
        }
        try {
            res = await nomo.getInstalledWebOns()
        } catch (e) {
            console.log(e)
            res = e
        }
}}>
    Add Custom Token
</button>

{JSON.stringify(res)}

<style>


</style>
