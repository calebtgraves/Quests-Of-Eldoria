<script>
    import { allCharacters, currentPage } from "../stores.mjs";
    let createButton
    let classChoice = ""
    let classChoices = []
    let name = ""
    function handleClassChoice(e){
        classChoice = e.target.value
        console.log(classChoice)
        classChoices.forEach((choice)=>{
            choice.classList.remove("selected");
            if(choice.value == classChoice){
                choice.classList.add("selected");
            }
        })
        if(name != ""){
            createButton.style.display = "inline-block";
        }
    }
    function createNewCharacter(){
        const thisCharacter = {
                type:"character",
                name:name,
                image:`src/images/${classChoice}.svg`,
                characterClass:classChoice,
            }
        let characters = localStorage.getItem("characters")
        let characterArray = []
        if(characters){
            characterArray = JSON.parse(characters)
        }
        characterArray.push(thisCharacter)
        localStorage.setItem("characters",JSON.stringify(characterArray))
        allCharacters.set(characterArray);
        currentPage.set("character-select-page")
    }
</script>
<header>
    <button on:click={()=>{currentPage.set("character-select-page")}}>Back</button>
    <button id="create-button" bind:this={createButton} on:click={createNewCharacter}>Create</button>
</header>
<div id="class-select">
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[0]} value="warrior">Warrior</button>
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[1]} value="thief">Thief</button>
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[2]} value="mage">Mage</button>
</div>
<div id="name-select">
    <input id="name-input" placeholder="Enter Character Name" on:keyup={(e)=>{
        //@ts-ignore
        name = e.target.value
        createButton.style.display="none";
        if(name != "" && classChoice != ""){
            createButton.style.display = "inline-block";
        }
    }}/>
</div>
<style>
    header{
        display:flex;
        justify-content: space-between;
    }
    button{
        padding:.2rem;
        margin:.5rem;
        font-size:1rem;
        cursor:pointer;
    }
    #create-button{
        display:none;
    }
    #class-select{
        display:flex;
        justify-content: center;
        align-items: flex-end;
        flex:1;
    }
    #name-select{
        flex:1;
        display:flex;
        justify-content: center;
        align-items: flex-start;
    }
    #name-input{
        box-shadow:0px 0px 5px 0px lightgrey;
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        transition: box-shadow 0.25s, filter 0.1s;
        margin:1rem;
    }
    .select-button{
        opacity:75%;
        flex-grow: 0;
        flex-shrink: 0;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        box-shadow:0px 0px 5px 0px lightgrey;
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #f9f9f9;
        cursor: pointer;
        transition: box-shadow 0.25s, filter 0.1s;
        margin:1rem;
    }
    .select-button:hover{
        box-shadow:0px 0px 8px 2px lightgrey;
    }
    :global(.select-button.selected) {
        box-shadow:0px 0px 4px 4px gold;
        opacity: 100%;
    }
    :global(.select-button.selected:hover) {
        box-shadow:0px 0px 4px 4px gold;
    }
</style>