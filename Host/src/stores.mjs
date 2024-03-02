import { writable } from "svelte/store";

export const connectedPlayers = writable([]);
export const socket = writable();
export const questCode = writable("")