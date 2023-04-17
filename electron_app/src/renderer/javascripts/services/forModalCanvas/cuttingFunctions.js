import GallaryImage from '../../entities/GalleryImage';
import HandFree from '../../components/modal/canvas/tools/HandFree';

export function cutImgInGallery(canvasRef, galleryImg, setGalleryImg, setToolState, setCanvasImg) {
  setTimeout(() => {
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      console.log('url: ', url);
      const newGallaryImage = Object.assign(new GallaryImage(), {
        ...galleryImg,
        url: url,
        imgCuted: true,
        lastOffsetValueX: 0,
        lastOffsetValueY: 0,
        zoom: '100'
      })
      setGalleryImg(() => {
        return newGallaryImage;
      })
      setToolState((prev) => {
        return {
          ...prev,
          type: 'handFree',
          tool: new HandFree(canvasRef.current)
        }
      })
      const img = new Image()
      img.onload = function () {
        setCanvasImg(this)
      }
      img.src = newGallaryImage.getUrl();
    }, 'image/jpeg', 1)
  }, 0)
}