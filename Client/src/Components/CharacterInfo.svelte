<script>
    import { currentPage, selectedCharacter, vip } from "../stores.mjs";
    import { socket } from "../stores.mjs";

    let questId = ""
    const getSocket = async () => {
        // @ts-ignore
        const client = io("ws://10.9.29.194:3000")
        socket.set(client)
        $socket.on('connected',()=>{
            $socket.emit('player',[$socket.id,questId,$selectedCharacter])
        });
        $socket.on('playerConnected',(isVip)=>{
            $vip = isVip
            currentPage.set('waiting-room-page')
        })
        $socket.on('invalidCode',()=>{
            console.log("Code invalid");
            questId = ""
        })
    }
</script>
<header>
    <div>
        <button on:click={()=>{currentPage.set("character-select-page")}}>Back</button>
    </div>
    <div>
        <h1>{$selectedCharacter.name}</h1>
        <h3>{$selectedCharacter.characterClass.toUpperCase()[0]+$selectedCharacter.characterClass.slice(1)}</h3>
    </div>
    <div>
    </div>
</header>
<div id="join-quest">
    <h2>Join a Quest</h2>
    <div>
        <input bind:value={questId} placeholder="Enter Quest Code" id="quest-code-input" maxlength="4"/>
        <button id="quest-code-submit" on:click={getSocket}>Submit</button>
    </div>
</div>
<style>
    header{
        display:flex;
        justify-content: space-between;
    }
    header div{
        flex:1;
    }
    header div h1, header div h3{
        text-align: center;
    }
    button{
        padding:.2rem;
        margin:.5rem;
        font-size:1rem;
        cursor:pointer;
    }
    #join-quest div{
        display:flex;
        justify-content: center;
    }
    #join-quest h2{
        text-align: center;
    }
    #quest-code-input{
        box-shadow:0px 0px 5px 0px lightgrey;
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        transition: box-shadow 0.25s, filter 0.1s;
        margin:1rem 0;
        min-width:0;
        margin-left:.5rem;
    }
    #quest-code-submit{
        box-shadow:0px 0px 5px 0px lightgrey;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        transition: box-shadow 0.25s, filter 0.1s;
        margin:1rem 0;
        margin-right:.5rem;
    }
</style>