<script>
    import { selectedCharacter, socket, baddieNames, myTurn } from "../stores.mjs";
    console.log($selectedCharacter)
    let target;
    function handleAction(itemInfo){
        $socket.emit('doDamage',$socket.id, itemInfo, target,"baddie");
    }
    function handleSelectTarget(baddie){
        target = baddie;
    }
</script>
<div>
    {#if $myTurn}
        <h1>Select Target:</h1>
        {#each $baddieNames as baddie}
        <label>
            <input type="radio" name="target" value={baddie} on:click={()=>{handleSelectTarget(baddie)}}>
            <p>{baddie}</p>
        </label>
        {/each}
        {#if target}
        {#each Object.entries($selectedCharacter.items) as [item,info]}
            {#if info.attack > 0}
            <button on:click={()=>{
                handleAction(info)
            }}>Use {item}</button>
            {/if}
        {/each}
        {/if}
    {:else}
        <h1>Wait for your turn.</h1>
    {/if}
</div>