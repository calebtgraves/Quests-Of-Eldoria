<script>
    import { baddieHealth, baddieList, connectedPlayers, gameStarted, socket } from "../stores.mjs";
    import Baddie from "./Baddie.svelte";
    $: $gameStarted, generateBaddies()
    let baddies = []
    function generateBaddies(){
        let i = 1
        let baddiesHp = {}
        $connectedPlayers.forEach(()=>{
            baddiesHp[`Goblin ${i}`] = 12;
            baddies.push({
                name:`Goblin ${i}`,
                hp:12,
                damage:3,
                image:"src/images/goblin.svg",
                stats:{
                    speed:3,
                    strength:4,
                    smarts:1
                },
                type:"baddie"
            })
            i ++
        })
        baddieList.set(baddies);
        baddieHealth.set(baddiesHp);
    }
</script>
<div id="baddies">
    {#each $baddieList as baddie}
        <Baddie baddie={baddie}/>
    {/each}
</div>
<style>
    #baddies{
        flex:1;
        display:flex;
        align-items: center;
        justify-content: center;
        align-content:center;
        flex-wrap:wrap;
    }
</style>