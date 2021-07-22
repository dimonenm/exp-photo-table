import React from 'react';

const WorkplaceItemNew = ({ name }) => {


    return (
        <div className="workplace-item-new">
            <div className="workplace-item-name">{name}</div>
            <div className="workplace-item-plus"></div>
        </div>
    );
}

export default WorkplaceItemNew;