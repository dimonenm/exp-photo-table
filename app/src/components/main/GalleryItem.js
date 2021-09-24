import React from 'react';

const GalleryItem = ({ name, url, setModalProperties, setCurrentGalleryImage, galleryImages }) => {
  let shortName = '';
  if (name.length > 20) {
    shortName = name.substr(0, 20) + '...'; // обрезаем слишком длинное имя файла
  }

  const dbClickHandler = (event) => {
    event.preventDefault();
    setModalProperties(() => {
      return {
        isOpen: true,
        type: "preview",
        nameImg: shortName ? shortName : name,
        urlImg: url
      }
    });
  }

  const dragStartHandler = (event) => {
    event.target.classList.add('gallery-item-hold');
    setTimeout(() => event.target.classList.add('gallery-item-hide'), 0);
    setCurrentGalleryImage({ nameImg: name, urlImg: url, textImg: null });
  }

  const dragEndHandler = (event) => {
    if (galleryImages.length === 0) {
      event.target.classList.remove('gallery-item-hold', 'gallery-item-hide');
    }
    if (galleryImages.length > 0) {
      galleryImages.forEach(item => {
        if (name === item.nameImg) {
          event.target.classList.add('gallery-item-hide')
          event.target.classList.remove('gallery-item-hold');
          event.target.setAttribute('draggable', false);
        }
        else {
          event.target.classList.remove('gallery-item-hold', 'gallery-item-hide');
        }
      })
    }
    setCurrentGalleryImage({ nameImg: null, urlImg: null, textImg: null });
  }



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

export default GalleryItem;