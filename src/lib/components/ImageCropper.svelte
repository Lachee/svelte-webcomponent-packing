<script lang="ts">
  import Preview from "./Preview.svelte";

    const ACCEPTED_MIME : string[] = [
        'image/jpeg',
        'image/png',
    ];

    let isDraggingContent = false;
    let fileInput : HTMLInputElement;
    let file : File|null;

    function onDragStart(evt : DragEvent) {
        isDraggingContent = true;
        evt.preventDefault();
        evt.stopPropagation();
    }   
    function onDragEnd(evt : DragEvent) {
        isDraggingContent = false;
        evt.preventDefault();
        evt.stopPropagation();
    }
    function onDrop(evt : DragEvent) {
        onDragEnd(evt);
        if (evt.dataTransfer) {
            fileInput.files = evt.dataTransfer.files;
        }
    }
    function onFileInputChange() {
        file = fileInput.files?.item(0) || null;
    }
</script>


<style lang="postcss">

    .container {
        border: 2px dashed #ccc;
        border-radius: 20px;
        font-family: sans-serif;
        padding: var(--box-padding);

        height: 50vh;
        box-sizing: border-box;
    }

    .container.dragging {
        border-color: purple;
    }
    
    .gallery {
        --auto-grid-min-size: 16rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
        grid-gap: 1rem;
    }

</style>


<div class="container" class:dragging={isDraggingContent}
    on:dragenter={onDragStart} 
    on:dragover={onDragStart}
    on:dragleave={onDragEnd} 
    on:drop={onDrop}
> 

    <label class="button">
        <input type="file" accept="{ACCEPTED_MIME.join(',')}" multiple on:change={onFileInputChange} bind:this={fileInput} />
        <span class="label">Pick Photos</span>
    </label>

    <div class="gallery">
        {#if file != null}
            <Preview file={file} />
        {/if}
    </div>
</div>