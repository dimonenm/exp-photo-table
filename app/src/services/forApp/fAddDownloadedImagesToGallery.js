import GalleryItem from '../../components/main/GalleryItem';

function addDownloadedImagesToArrforGallery(
  downloadedImages, //массив загруженных изображений
  arrDownloadedImages, //массив для хранения React элементов
  galleryImages, //массив изображений выбранных для фототаблицы
  setModalProperties, //сеттер со свойствами модального окна
  setCurrentGalleryImage, //сеттер со свойствами выбранного изображения
) {
  //Функция формирует массив с загруженными изображениями.

  arrDownloadedImages = []; //Удаление изображений из массива

  downloadedImages.forEach(item => {

    //Проверка на наличие изображений в галерее и фототаблице
    let isHasInGalleryImages = false;
    if (galleryImages.length) {
      galleryImages.forEach(img => {
        if (item.name === img.getName()) {
          isHasInGalleryImages = true;
        }
      })
    }

    //Формирование массива с загруженными изображениями в зависимости от наличия изображений в галерее и фототаблице
    if (isHasInGalleryImages) {
      arrDownloadedImages.push(<GalleryItem
        key={item.name}
        name={item.name}
        url={item.url}
        hiden={true}
        setModalProperties={setModalProperties}
        setCurrentGalleryImage={setCurrentGalleryImage}
        galleryImages={galleryImages}
      />);
    } else {
      arrDownloadedImages.push(<GalleryItem
        key={item.name}
        name={item.name}
        url={item.url}
        hiden={false}
        setModalProperties={setModalProperties}
        setCurrentGalleryImage={setCurrentGalleryImage}
        galleryImages={galleryImages}
      />);
    }
  });
  return arrDownloadedImages;
}

export default addDownloadedImagesToArrforGallery;