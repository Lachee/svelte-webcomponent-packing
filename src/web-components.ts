import type { SvelteComponent } from 'svelte'
import ImageCropper from './lib/components/ImageCropper.svelte';


customElements.define(

    // ref: https://www.colorglare.com/svelte-components-as-web-components-b400d1253504
    // I recommend prefixing your custom elements, but for this example
    // I'm keeping it simple.
    'image-cropper',
    class extends HTMLElement {
        _element: SvelteComponent | undefined;
        

        constructor() {
            super()
            
        }
        
        static get observedAttributes() {
            return [ ]; 
        }

        createProps() {
            return { }
        }

        connectedCallback(): void {
            // Create the shadow root.
            const shadowRoot = this.attachShadow({ mode: 'open' });

            // Instantiate the Svelte Component
            this._element = new ImageCropper({
                // Tell it that it lives in the shadow root
                target: shadowRoot,
                // Pass any props
                props: this.createProps(),
            });
        }

        attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
            const newProps = this.createProps();
            this._element?.$set(newProps);
        }

        disconnectedCallback(): void {
            // Destroy the Svelte component when this web component gets
            // disconnected. If this web component is expected to be moved
            // in the DOM, then you need to use `connectedCallback()` and
            // set it up again if necessary.
            this._element?.$destroy();
        }


    }
)