<script>
    import { allCharacters } from "../stores.mjs";
    import CharacterIcon from "./CharacterIcon.svelte";
    function getCharacters(){
        const storedCharacters = localStorage.getItem("characters")
        if(storedCharacters){
            allCharacters.set(JSON.parse(storedCharacters))
        }
    }
    getCharacters()
</script>
<h1>Which hero will you choose?</h1>
<section>
{#each $allCharacters.reverse() as character}
<CharacterIcon characterInfo={character}/>
{/each}
<CharacterIcon characterInfo={{
    name:"New Hero",
    image:"src/images/new.svg",
    type:"new"
}}/>
</section>
<style>
    h1{
        text-align: center;
        margin:1rem;
    }
    section{
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        align-items: center;
        align-content:center;
        flex:1;
        padding-bottom:2rem;
    }
</style>