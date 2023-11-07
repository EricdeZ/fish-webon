import { writable } from 'svelte/store';
export const fish_contract = writable({
    signer: null,
    provider: null
});

