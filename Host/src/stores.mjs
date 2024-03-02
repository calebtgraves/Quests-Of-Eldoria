import { writable } from "svelte/store";

export const connectedPlayers = writable([]);
export const heroHealth = writable({})
export const gameStarted = writable(false);
export const baddieList = writable([]);
export const baddieHealth = writable({})
export const socket = writable();
export const questCode = writable("");
export const currentTurn = writable(0)
export const turnOrder = writable([])