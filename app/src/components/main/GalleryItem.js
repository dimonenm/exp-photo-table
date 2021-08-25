import React from 'react';

const GalleryItem = ({ name, url, setModalProperties }) => {
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
    console.log(event.target);
    console.log(name);
    console.log(url);
    event.target.classList.add('gallery-item-hold');
    setTimeout(() => event.target.classList.add('gallery-item-hide'), 0);
  }

  const dragEndHandler = (event) => {
    event.target.classList.remove('gallery-item-hold', 'gallery-item-hide');
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
        <img src={url} alt={name} draggable="false"></img>
      </div>
    </div>
  );
}

export default GalleryItem;