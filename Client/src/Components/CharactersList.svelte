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
<h1>Character Select:</h1>
<section>
{#each $allCharacters as character}
<CharacterIcon characterInfo={character}/>
{/each}
<CharacterIcon characterInfo={{
    name:"New Character",
    image:"src/images/new.jpg",
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
        height:100%;
    }
</style>