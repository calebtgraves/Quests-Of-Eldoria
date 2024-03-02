<script>
    import { allCharacters, currentPage } from "../stores.mjs";
    let createButton
    let nameInput
    let classChoice = ""
    let classChoices = []
    let name = ""
    let classStats = {
        "warrior":{
            strength:5,
            speed:3,
            smarts:1
        },
        "thief":{
            speed:5,
            smarts:3,
            strength:1
        },
        "mage":{
            smarts:5,
            strength:3,
            speed:1
        }
    }
    let classItems = {
        "warrior":{
            "sword":{
                "type":"melee",
                "attack":3,
                "defense":0
            },
            "wooden shield":{
                "type":"armor",
                "attack":0,
                "defense":1
            }
        },
        "thief":{
            "dagger":{
                "type":"melee",
                "attack":2,
                "defense":0
            }
        },
        "mage":{
            "basic staff":{
                "type":"magic",
                "attack":1,
                "defense":0,
                "specialAttack":{
                    "attack":5,
                    "cost":5
                }
            }
        }
    }
    let classHitPoints = {
        "warrior":20,
        "thief":17,
        "mage":15
    }
    function handleClassChoice(e){
        if(e.target.value){
            classChoice = e.target.value;
        }else{
            classChoice = e.target.parentElement.value;
        }
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
            id:$allCharacters.length,
            type:"character",
            name:name,
            image:`src/images/${classChoice}.svg`,
            characterClass:classChoice,
            stats:classStats[classChoice],
            items:classItems[classChoice],
            hp:classHitPoints[classChoice]
        }
        let characters = localStorage.getItem("characters")
        let characterArray = []
        if(characters){
            characterArray = JSON.parse(characters)
        }
        characterArray.push(thisCharacter)
        localStorage.setItem("characters",JSON.stringify(characterArray));
        allCharacters.set(characterArray);
        currentPage.set("character-select-page");
        nameInput.value = "";
        classChoice = "";
        classChoices.forEach((choice)=>{
            choice.classList.remove("selected");
        })
    }
</script>
<header>
    <div>
        <button on:click={()=>{currentPage.set("character-select-page")}}>Back</button>
    </div>
    <div>
        <h1>Chreate a Hero</h1>
    </div>
    <div>
        <button id="create-button" bind:this={createButton} on:click={createNewCharacter}>Create</button>
    </div>
</header>
<div id="name-select">
    <input id="name-input" bind:this={nameInput} placeholder="Enter Character Name" on:keyup={(e)=>{
        //@ts-ignore
        name = e.target.value
        createButton.style.display="none";
        if(name != "" && classChoice != ""){
            createButton.style.display = "inline-block";
        }
    }}/>
</div>
<div id="class-select">
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[0]} value="warrior">
            <div class="class-image" style="background-image:url('src/images/warrior.svg')">
            </div>
            <div class="class-name">
                Warrior
            </div>
        </button>
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[1]} value="thief">
            <div class="class-image" style="background-image:url('src/images/thief.svg')">
            </div>
            <div class="class-name">
                Thief
            </div>
        </button>
        <button class="select-button" on:click={handleClassChoice} bind:this={classChoices[2]} value="mage">
            <div class="class-image" style="background-image:url('src/images/mage.svg')">
            </div>
            <div class="class-name">
                Mage
            </div>
        </button>
</div>
<style>
    header{
        display:flex;
        justify-content: space-between;
    }
    header div{
        flex:1;
    }
    header div h1{
        text-align: center;
    }
    button{
        padding:.2rem;
        margin:.5rem;
        font-size:1rem;
        cursor:pointer;
    }
    #create-button{
        display:none;
        float:right;
    }
    #class-select{
        display:flex;
        justify-content: center;
        align-items: flex-start;
        flex:2;
        flex-wrap:wrap;
    }
    #name-select{
        flex:1;
        display:flex;
        justify-content: center;
        align-items: flex-end;
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
        opacity:50%;
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
        transition: box-shadow 0.25s, filter 0.1s, opacity .25s;
        margin:1rem;
    }
    .class-image{
        height:150px;
        width:150px;
        background-size:contain;
        background-repeat:no-repeat;
        background-position: center;
    }
    .class-name{
        margin:0;
    }
    .select-button:hover{
        box-shadow:0px 0px 8px 2px lightgrey;
        opacity:75%;
    }
    :global(.select-button.selected) {
        box-shadow:0px 0px 4px 4px gold !important;
        opacity: 100%;
    }
    :global(.select-button.selected:hover) {
        box-shadow:0px 0px 4px 4px gold !important;
        opacity:100%;
    }
</style>