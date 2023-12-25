import { loadImg } from "./loadImg";

export const loadImgCanvas = async (imgSrc: string, maxSize?: {width: number, height: number}) => {
    const img = await loadImg(imgSrc);
    let canvasWidth = img.width;
    let canvasHeight = img.height;
    
    if (maxSize) {
        const ratio = Math.max(img.width / maxSize.width, img.height / maxSize.height);

        if (ratio > 1) {
            canvasWidth = img.width / ratio;
            canvasHeight = img.height / ratio;
        }
    }

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    
    return {
        canvas,
        ctx,
        canvasWidth,
        canvasHeight
    }
};