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
    photoTableData.unit !== "№15 Симферопольский" ||
    photoTableData.kusp !== null ||
    photoTableData.executor !== "Д.С. Ежель") {
    return <div
      className="workplace-data-btn"
      onClick={clickHandler}
    >
      Изменить данные фототаблицы
    </div>
  }

  return <div
    className="workplace-data-btn"
    onClick={clickHandler}
  >Ввести данные фототаблицы</div>;
}

export default WorkplaceItemDataBtn;