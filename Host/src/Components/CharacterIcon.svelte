<script>
    export let characterInfo
</script>
<div class="character-icon">
    <div class="character-image" style="background-image:url('{characterInfo.image}')">
    </div>
    <div class="character-name">
        <p>{characterInfo.name}</p>
    </div>
</div>
<style>
    .character-icon{
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
        font-size: .8em;
        font-weight: 500;
        font-family: inherit;
        background-color: #f9f9f9;
        cursor: pointer;
        transition: box-shadow 0.25s, filter 0.1s;
        margin:1rem;
    }
    .character-image{
        height:100px;
        width:100px;
        background-size:contain;
        background-repeat:no-repeat;
        background-position: center;
    }
    .character-name p{
        margin:0;
    }
</style>