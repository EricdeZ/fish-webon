import {zscSigner} from "ethersjs-nomo-webons";
import {chainIdZeniqSmartChain} from "./constants.js";

export async function getTx() {
    return {
        gasLimit: 170000,
        gasPrice: 10000000000,
        nonce: await zscSigner.getNonce(),
        chainId: chainIdZeniqSmartChain,
        type: 0,
    };
}