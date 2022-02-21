import WorkplaceItem from '../../components/main/WorkplaceItem';

function addSelectedImagesToArrForGallery(
    galleryImages, //массив выбранных изображений для фототаблицы
    arrGalleryImages, //массив для хранения React элементов
    setModalProperties, //сеттер со свойствами модального окна
) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.

    galleryImages.forEach((item, index) => {
        arrGalleryImages.unshift(<WorkplaceItem
            key={item.getIndex()}
            index={item.getIndex()}
            name={`Иллюстрация ${item.getIndex()}`}
            // name={`Иллюстрация ${arrGalleryImages.length + 1}`}
            img={item.getUrl()}
            text={item.getImgDesc()}
            setModalProperties={setModalProperties}
        />);
    });
    return arrGalleryImages;
}

export default addSelectedImagesToArrForGallery;