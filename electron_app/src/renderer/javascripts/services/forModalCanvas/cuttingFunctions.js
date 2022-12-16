import GallaryImage from '../../entities/GalleryImage';
import HandFree from '../../components/modal/canvas/tools/HandFree';

export function cutImgInGallery(canvasRef, galleryImg, setGalleryImg, setToolState) {
  setTimeout(() => {
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
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
      });
    }, 'image/jpeg', 1)
  }, 0)
}