<script>
  import { onMount } from "svelte";
  import JoinCode from "./Components/JoinCode.svelte";
  import JoinedPlayers from "./Components/JoinedPlayers.svelte";
  import { baddieHealth, baddieList, connectedPlayers, currentTurn, gameStarted, heroHealth, questCode, socket, turnOrder } from "./stores.mjs";
    import Baddies from "./Components/Baddies.svelte";
    import Heroes from "./Components/Heroes.svelte";

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
      let allConnectedPlayers = [...$connectedPlayers,userInfo]
      connectedPlayers.set(allConnectedPlayers)
      console.log($connectedPlayers)
    })
    $socket.on('beginGame',()=>{
      console.log("Game Started");
      let characterHp = {}
      let baddies = []
      let i = 1
      $connectedPlayers.forEach((player)=>{
        characterHp[player.characterInfo.name] = player.characterInfo.hp
        baddies.push({characterInfo:{name:`Goblin ${i}`,type:"baddie"}})
        i++
      })
      heroHealth.set(characterHp)
      document.getElementById("lobby").style.display = "none";
      document.getElementById("gameplay").style.display = "flex";
      gameStarted.set(true);
      const shuffle = (array) => { 
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
      }; 
      turnOrder.set(shuffle([...baddies,...$connectedPlayers]))
      $socket.emit('nextTurn', $turnOrder[$currentTurn]["characterInfo"]["name"],$questCode, $turnOrder[$currentTurn]["characterInfo"]["type"])
    })
    $socket.on('doDamage',(itemInfo,target,type)=>{
      if(type == "baddie"){
        let allBaddieHealth = $baddieHealth
        allBaddieHealth[target] -= itemInfo.attack;
        for(let baddie in allBaddieHealth){
          if(allBaddieHealth[baddie] <= 0){
            delete allBaddieHealth[baddie]
            let allBaddies = $baddieList
            allBaddies.splice(allBaddies.indexOf(baddie),1)
            baddieList.set(allBaddies)
          }
        }
        baddieHealth.set(allBaddieHealth);
      }
      let nextTurn = $currentTurn+1
      if(nextTurn > $turnOrder.length-1){
        nextTurn = 0;
      }
      currentTurn.set(nextTurn)
      $socket.emit('nextTurn', $turnOrder[$currentTurn]["characterInfo"]["name"],$questCode, $turnOrder[$currentTurn]["characterInfo"]["type"])
    })
    $socket.on('nextTurn',(personType)=>{
      if(personType=="baddie" && $baddieList.length > 0){
        setTimeout(()=>{
          let target = $connectedPlayers[Math.floor(Math.random() * $connectedPlayers.length)].characterInfo.name
          let allHeroHealth = $heroHealth
          allHeroHealth[target] -= 3;
          heroHealth.set(allHeroHealth);
          let nextTurn = $currentTurn+1
          if(nextTurn > $turnOrder.length-1){
            nextTurn = 0;
          }
          currentTurn.set(nextTurn)
          $socket.emit('nextTurn', $turnOrder[$currentTurn]["characterInfo"]["name"],$questCode, $turnOrder[$currentTurn]["characterInfo"]["type"])
        },1000)
      }
    })
  })
</script>

<main id="lobby">
  <img class="logo" src="src/images/logo.svg" alt="logo" draggable="false"/>
  <JoinCode/>
  <JoinedPlayers/>
</main>
<main id="gameplay">
  {#if $turnOrder[$currentTurn]}
  <h1>Current Turn: {$turnOrder[$currentTurn]["characterInfo"]["name"]}</h1>
  {/if}
  <Baddies/>
  <Heroes/>
</main>

<style>
  #lobby{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }
  .logo{
    user-select: none;
    height:200px;
  }
  #gameplay{
    display:none;
    background-image:url('src/images/grass.svg');
    background-color: rgb(90, 182, 90);
    height:100%;
    flex-direction: column;
  }
</style>