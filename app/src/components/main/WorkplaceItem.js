import React from 'react';

const WorkplaceItem = ({ name, img, text, setModalProperties }) => {

  const backgroundImage = {
    backgroundImage: `url(${img})`
  }

  const dbClickHandler = (event) => {
    event.preventDefault();
    setModalProperties(prev => {
      return (
        {
          ...prev,
          isOpen: true,
          type: "setGalleryImageData"
        }
      );
    }
    )
  }

  return (
    <div className="workplace-item"
      onDoubleClick={dbClickHandler}
    >
      <div className="workplace-item-name">{name}</div>
      <div className="workplace-item-img" style={backgroundImage}></div>
      <div className="workplace-item-text">{text ? text : "Введите описание иллюстрации"}</div>
    </div>
  );
}

export default WorkplaceItem;