<script lang="ts">    
  import { getFileDataURL } from "$lib/File";
    import Cropper from "cropperjs";
    import 'cropperjs/dist/cropper.css';

    import { onDestroy, onMount } from "svelte";
    export let file : File;
    export let aspectRatio : number = 1;

    let filePreview : string;

    let cropper: Cropper | null;
    let img: HTMLImageElement;

    $: getFileDataURL(file).then((url) => filePreview = url);

    onMount(() => {
        img.addEventListener("load", initCropper);
    });

    onDestroy(() => {
        if (cropper)  {
            cropper.destroy();
            cropper = null;
        }
    })

    function initCropper() {
        console.log("initCropper: img loaded ", img.complete);
        cropper = new Cropper(img, {
            aspectRatio: aspectRatio,
            crop(event) { },
        });
    }


</script>


<style lang="postcss" >
    
    .image {
        position: relative;
        width: 100%;
        object-fit: contain;
        box-sizing: border-box;
    }

    .preview {
        width: 100%;
        object-fit: contain;
        position: relative;
        top: 0;
    }
    
</style>
<div class="iamge">
    <img bind:this={img} class="preview" src={filePreview} alt="" />
</div>