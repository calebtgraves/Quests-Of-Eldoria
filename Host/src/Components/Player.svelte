<script>
    import HealthBar from "./HealthBar.svelte";

    export let player
    console.log(player)
</script>
<div class="player">
    <div class="character-image" style="background-image:url('{player.characterInfo.image}')">
    </div>
    <div class="character-name">
        <p>{player.characterInfo.name}</p>
        <HealthBar character={player.characterInfo}/>
    </div>
</div>
<style>
    .player{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .character-image{
        height:150px;
        width:150px;
        background-size:contain;
        background-repeat:no-repeat;
        background-position: center;
    }
    .character-name p{
        font-size:1rem;
        margin:0;
        margin-top:-1rem;
        text-align:center;
    }
</style>