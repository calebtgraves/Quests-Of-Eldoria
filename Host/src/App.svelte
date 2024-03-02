<script>
  import { onMount } from "svelte";
  import JoinCode from "./Components/JoinCode.svelte";
  import JoinedPlayers from "./Components/JoinedPlayers.svelte";
  import { connectedPlayers, questCode, socket } from "./stores.mjs";

  const getSocket = async () => {
    // @ts-ignore
    const client = io("ws://10.9.29.194:3000")
    socket.set(client)
  }
  onMount(()=>{
    getSocket()
    $socket.on('connected',()=>{
      $socket.emit('host',$socket.id)
    })
    $socket.on('questCode',(code)=>{
      questCode.set(code)
    })
    $socket.on('connectedPlayer',(userInfo)=>{
      let allConnectedPlayers = [...$connectedPlayers,userInfo.characterInfo]
      connectedPlayers.set(allConnectedPlayers)
      console.log($connectedPlayers)
    })
  })
</script>

<main>
<img class="logo" src="src/images/logo.svg" alt="logo" draggable="false"/>
<JoinCode/>
<JoinedPlayers/>
</main>

<style>
  main{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }
  .logo{
    user-select: none;
    height:200px;
  }
</style>