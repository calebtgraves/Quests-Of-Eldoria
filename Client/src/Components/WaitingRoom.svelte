<script>
    import { vip } from "../stores.mjs";


</script>
<div id="waiting-room">
    <h1>You're In! See your name on the screen?</h1>
    {#if $vip}
    <button>Start Game</button>
    {/if}
</div>
<style>
    #waiting-room{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex:1;
        text-align: center;
        text-wrap:balance;
    }
    button{
        box-shadow:0px 0px 5px 0px lightgrey;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-weight: 500;
        font-family: inherit;
        transition: box-shadow 0.25s, filter 0.1s;
        font-size:1rem;
        cursor:pointer;
    }
    button:active{
        filter:brightness(80%);
    }
</style>