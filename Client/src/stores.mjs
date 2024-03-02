import { writable } from "svelte/store";

export const currentPage = writable("");
export const allCharacters = writable([])