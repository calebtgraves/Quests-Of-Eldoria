import { writable } from "svelte/store";

export const socket = writable();
export const currentPage = writable("");
export const allCharacters = writable([]);
export const selectedCharacter = writable({
    name:"",
    characterClass:"",
    items:{}
});
export const vip = writable(false);
export const baddieNames = writable([]);
export const myTurn = writable(false);