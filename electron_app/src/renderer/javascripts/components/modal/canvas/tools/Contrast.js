import Tool from "./Tool";
import GallaryImage from "../../../../entities/GalleryImage";

export default class Contrast extends Tool {
    constructor(canvas, galleryImg, setGalleryImg) {
        super(canvas);
        this.img = new Image();
        this.img.src = galleryImg.getUrl();
        this.galleryImg = galleryImg;
        this.setGalleryImg = setGalleryImg;
        this.listen();

        this.img.onload = () => {
            this.pr = canvas.height * 100 / this.img.height;
            this.zoom = +this.galleryImg.getZoom() / 100;
            this.imgWidth = (this.img.width / 100 * this.pr) * this.zoom;
            this.imgHeight = (this.img.height / 100 * this.pr) * this.zoom;
            this.imgOffsetX = (canvas.width - this.imgWidth) / 2;
            this.imgOffsetY = (canvas.height - this.imgHeight) / 2;
            this.offsetValueX = 0;
            this.offsetValueY = 0;
            this.lastOffsetValueX = this.galleryImg.getLastOffsetValueX();
            this.lastOffsetValueY = this.galleryImg.getLastOffsetValueY();
            
        }
    }
}