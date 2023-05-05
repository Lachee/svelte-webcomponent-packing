# Broken Svelte Webcomponent

This is an example image cropper to showcase how the webcomponet fails to include the Cropper.js's css file.
The goal is to have everything included in the final bundle.js and no secondary .css file.
If it does have a secondary css-file, it must work on the shadow dom.


# Running
`pnpm dev` to see it working with vite
`pnpm build` to see it broken with webcomponent