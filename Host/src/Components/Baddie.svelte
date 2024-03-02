<script>
    import HealthBar from "./HealthBar.svelte";

    export let baddie
</script>
<div class="baddie">
    <div class="baddie-image" style="background-image:url('{baddie.image}')">
    </div>
    <div class="baddie-name">
        <p>{baddie.name}</p>
        <HealthBar character={baddie}/>
    </div>
</div>
<style>
    .baddie{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .baddie-image{
        height:150px;
        width:150px;
        background-size:contain;
        background-repeat:no-repeat;
        background-position: center;
    }
    .baddie-name p{
        font-size:1rem;
        margin:0;
        margin-top:-1rem;
        text-align:center;
    }
</style>