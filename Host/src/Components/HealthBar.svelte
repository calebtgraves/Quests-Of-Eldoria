<script>
    export let character
    import { heroHealth, baddieHealth } from "../stores.mjs"
    $: $heroHealth, setHealthBar()
    $: $baddieHealth, setHealthBar()
    let healthbar
    function setHealthBar(){
        if(healthbar){
            if(character.type=="character"){
                console.log($heroHealth)
                healthbar.style.width = ($heroHealth[character.name]/character.hp)*100 +"%";
            }else if(character.type=="baddie"){
                healthbar.style.width = ($baddieHealth[character.name]/character.hp)*100 +"%";
            }
        }
    }
</script>
<div class="healthbar-container">
    <div class="healthbar" bind:this={healthbar}></div>
</div>
<style>
    .healthbar-container{
        height:10px;
        width:100px;
        border:solid black 1px;
        display:flex;
        background-color: red;
    }
    .healthbar{
        background-color:green;
        width:100%;
        transition:.2s ease-in-out;
    }
</style>