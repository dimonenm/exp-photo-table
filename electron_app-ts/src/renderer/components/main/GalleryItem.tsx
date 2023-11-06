import React from 'react';
import { ICurrentGalleryImage, IGallaryImage, IModalProperties } from '../../interfaces/interfaces';

interface IGalleryItemDto {
  name: string,
  url: string,
  hidden: boolean,
  galleryImages: IGallaryImage[],
  setModalProperties: React.Dispatch<React.SetStateAction<IModalProperties>>,
  setCurrentGalleryImage: React.Dispatch<React.SetStateAction<ICurrentGalleryImage>>
}

const GalleryItem = ({ name, url, hidden, galleryImages, setModalProperties, setCurrentGalleryImage }: IGalleryItemDto) => {
  let shortName = '';
  if (name.length > 20) {
    // shortName = name.substr(0, 20) + '...'; // обрезаем слишком длинное имя файла
    shortName = name.substring(0, 20) + '...'; // обрезаем слишком длинное имя файла
  }

  const dbClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setModalProperties({
      isOpen: true,
      type: "preview",
      nameImg: shortName ? shortName : name,
      urlImg: url,
      textImg: '',
      indexImgInGallery: '',
      cut: false
    });
  }

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    const target = event.target as Element
    setTimeout(() => target.classList.add('gallery-item-hide'), 0);
    setCurrentGalleryImage(
      {
        index: '',
        nameImg: name,
        urlImg: url,
        orientation: ''
      }
    );
  }

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as Element
    if (galleryImages.length === 0) {
      target.classList.remove('gallery-item-hide');
    }

    const isFindedInGalleryImages: IGallaryImage | undefined = galleryImages.find((item: IGallaryImage): boolean => {
      if (name === item.getName()) return true
      return false;
    })

    if (!isFindedInGalleryImages) {
      target.classList.remove('gallery-item-hide');
    }

    setCurrentGalleryImage(
      {
        index: '',
        nameImg: '',
        urlImg: '',
        orientation: ''
      }
    );
  }

  if (hidden) {
    return (
      <div className="gallery-item gallery-item-hide"
        draggable="false"
      >
        <div className="gallery-item-name">{shortName ? shortName : name}</div>
        <div className="gallery-item-img">
          <img
            src={url}
            alt={name}
            draggable="false"></img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="gallery-item"
        onDoubleClick={dbClickHandler}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        draggable="true"
      >
        <div className="gallery-item-name">{shortName ? shortName : name}</div>
        <div className="gallery-item-img">
          <img
            src={url}
            alt={name}
            draggable="false"></img>
        </div>
      </div>
    );
  }
}

export default GalleryItem;