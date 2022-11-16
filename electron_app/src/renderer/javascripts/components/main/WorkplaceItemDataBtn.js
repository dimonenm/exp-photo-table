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

  if (
    photoTableData.numbOMP !== null ||
    photoTableData.factOMP !== null ||
    photoTableData.adressOMP !== null ||
    photoTableData.dateOMP !== null ||
    photoTableData.unit !== null ||
    photoTableData.kusp !== null ||
    photoTableData.executor !== null) {
    return <div
      className="orientation-menu-data-btn"
      onClick={clickHandler}
    >
      Изменить данные фототаблицы
    </div>
  }

  return <div
    className="orientation-menu-data-btn"
    onClick={clickHandler}
  >Ввести данные фототаблицы</div>;
}

export default WorkplaceItemDataBtn;