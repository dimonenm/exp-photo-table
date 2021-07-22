import React from 'react';

const WorkplaceItem = ({ name, img, text }) => {

    const backgroundImage = {
        backgroundImage: `url(${img})`
    }
    
    return (
        <div className="workplace-item">
            <div className="workplace-item-name">{name}</div>
            <div className="workplace-item-img" style={backgroundImage}></div>
            <div className="workplace-item-text">{text}</div>
        </div>
    );
}

export default WorkplaceItem;