<script>
    import { connectedPlayers } from "../stores.mjs";
    import Player from "./Player.svelte";


</script>
<div id="heroes">
    {#each $connectedPlayers as player}
    <Player player={player}/>
    {/each}
</div>
<style>
    #heroes{
        flex:1;
        display:flex;
        align-items: center;
        justify-content: center;
        align-content:center;
        flex-wrap:wrap;
    }
</style>