<script>
    import { connectedPlayers } from "../stores.mjs";
    import CharacterIcon from "./CharacterIcon.svelte";
</script>
{#if $connectedPlayers.length > 0}
    <h1>Connected Players:</h1>
{/if}
<div id="joined-players">
    {#each $connectedPlayers as player}
    <CharacterIcon characterInfo={player.characterInfo}/>
    {/each}
</div>
<style>
    #joined-players{
        display:flex;
        flex-wrap:wrap;
        align-content:center;
        justify-content: center;
        align-items: center;
    }
</style>