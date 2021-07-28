import React from 'react';

const GalleryItem = ({ name, url }) => {
    let shortName = '';
    if (name.length > 20) {
        shortName = name.substr(0, 20) + '...'; // обрезаем слишком длинное имя файла
    }

    return (
        <div className="gallery-item">
            <div className="gallery-item-name">{shortName ? shortName : name}</div>
            <div className="gallery-item-img">
                <img src={url} alt={name}></img>
            </div>
        </div>
    );
}

export default GalleryItem;