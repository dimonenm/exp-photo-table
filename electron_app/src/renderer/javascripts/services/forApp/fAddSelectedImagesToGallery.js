import React, { Fragment } from 'react';
import WorkplaceItem from '../../components/main/WorkplaceItem';
import WorkplaceItemPlacingMiddlePart from '../../components/main/WorkplaceItemPlacingMiddlePart';

function addSelectedImagesToArrForGallery(
    galleryImages, //массив выбранных изображений для фототаблицы
    setGalleryImages, //сеттер для изменения выбранных изображений для фототаблицы
    currentGalleryImage,
    setCurrentGalleryImage,
    arrGalleryImages, //массив для хранения React элементов
    setModalProperties, //сеттер со свойствами модального окна
) {
    //Функция формирует массив с выбранными изображениями для фототаблицы.

    galleryImages.forEach((item, index) => {
        arrGalleryImages.unshift(
            <Fragment
                key={item.getIndex()}
            >
                <WorkplaceItemPlacingMiddlePart
                    index={item.getIndex()}
                    galleryImages={galleryImages}
                    setGalleryImages={setGalleryImages}
                    currentGalleryImage={currentGalleryImage}
                    setCurrentGalleryImage={setCurrentGalleryImage}
                />
                <WorkplaceItem
                    index={item.getIndex()}
                    name={`Иллюстрация ${item.getIndex()}`}
                    img={item.getUrl()}
                    text={item.getImgDesc()}
                    setModalProperties={setModalProperties}
                />
            </Fragment>
        );
    });
    return arrGalleryImages;
}

export default addSelectedImagesToArrForGallery;