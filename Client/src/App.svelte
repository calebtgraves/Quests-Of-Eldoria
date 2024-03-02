<script>
    import { onMount } from "svelte";
    import CharactersList from "./Components/CharactersList.svelte";
    import {currentPage} from "./stores.mjs";
    import CharacterCreator from "./Components/CharacterCreator.svelte";
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
    console.log(pages);
})
</script>
<main>
    <div id="character-select-page" class="page" bind:this={pages[0]}>
        <CharactersList/>
    </div>
    <div id="create-character-page" class="page" bind:this={pages[1]}>
        <CharacterCreator/>
    </div>
</main>
<style>
    main{
        height:100%;
        display:flex;
        flex-direction: column;
    }
    .page{
        height:100%;
        display:none;
        flex-direction: column;
    }
</style>
