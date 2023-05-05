export async function getFileDataURL(file : File|Blob) : Promise<string> {
    const preview = await (new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror  = (error) => { reject(error); };
        reader.onloadend = () => {
            resolve(reader.result as string);
        }
        if (file !== undefined)
            reader.readAsDataURL(file);
    }));
    return preview;
}