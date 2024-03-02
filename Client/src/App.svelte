<script>
    import { onMount } from "svelte";
    import CharactersList from "./Components/CharactersList.svelte";
    import {currentPage, socket} from "./stores.mjs";
    import CharacterCreator from "./Components/CharacterCreator.svelte";
    import CharacterInfo from "./Components/CharacterInfo.svelte";
    import WaitingRoom from "./Components/WaitingRoom.svelte";
    
    let pages = []
    $: $currentPage, switchView()
    function switchView(){
        pages.forEach((page)=>{
            page.style.display = "none";
            if(page.id==$currentPage){
                page.style.display = "flex";
            }
        })
    }
onMount(()=>{
    currentPage.set("character-select-page");
})
</script>
<main>
    <div id="character-select-page" class="page" bind:this={pages[0]}>
        <CharactersList/>
    </div>
    <div id="create-character-page" class="page" bind:this={pages[1]}>
        <CharacterCreator/>
    </div>
    <div id="character-info-page" class="page" bind:this={pages[2]}>
        <CharacterInfo/>
    </div>
    <div id="waiting-room-page" class="page" bind:this={pages[3]}>
        <WaitingRoom/>
    </div>
</main>
<style>
    main{
        height:100%;
        display:flex;
        flex-direction: column;
    }
    .page{
        flex:1;
        display:none;
        flex-direction: column;
    }
    #character-info-page{
        justify-content: space-between;
    }
</style>
