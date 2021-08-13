import React from 'react';

const WorkplaceItemDataBtn = ({ photoTableData, setModalProperties }) => {

  function clickHandler() {
    setModalProperties(prev => {
      return (
        {
          ...prev,
          isOpen: true,
          type: "setPhotoTableData"
        }
      );
    }
    )
  };

  if (photoTableData) return <div className="workplace-data-btn">Изменить данные фототаблицы</div>

  return <div
    className="workplace-data-btn"
    onClick={clickHandler}
  >Ввести данные фототаблицы</div>;
}

export default WorkplaceItemDataBtn;