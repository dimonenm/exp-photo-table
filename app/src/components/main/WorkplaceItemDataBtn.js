import React from 'react';

const WorkplaceItemDataBtn = ({ photoTableData }) => {    
    if (photoTableData) return <div className="workplace-data-btn">Изменить данные фототаблицы</div>

    return <div className="workplace-data-btn">Ввести данные фототаблицы</div>;
}

export default WorkplaceItemDataBtn;