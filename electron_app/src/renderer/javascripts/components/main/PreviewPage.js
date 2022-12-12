import React from 'react';

function PreviewPage({ type, parity, img1, img2, img3, img4, galleryImages, photoTableData, settings, setModalProperties }) {

  const dbClickHandler = (event) => {
    event.preventDefault();
    setModalProperties(prev => {
      return (
        {
          ...prev,
          isOpen: true,
          type: "editPhoto",
          indexImgInGallery: img1.getIndex()
        }
      );
    }
    )
  }

  if (type === 'title') {
    return (
      <div className='preview-title-page'>
        <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
        <div className='preview-title-page-separator'></div>
        <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
        <div className='preview-title-page-description'>{`к протоколу осмотра места происшествия от ${photoTableData.dateOMP}  по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}`}</div>
        <div className='preview-title-page-img' onDoubleClick={dbClickHandler}>
          <img src={img1.getUrl()} width={"100%"} height={"100%"}></img>
        </div>
        <div className='preview-title-page-photo-description'>
          <span>{`Фото № ${img1.getIndex()}. `}</span>{img1.getImgDesc()}</div>
        <div className='preview-title-page-executor'>{`специалист___________${photoTableData.executor}`}</div>
      </div>
    )
  }
  if (type === 'page') {
    return (
      <div className='preview-title-page'>
        <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
        <div className='preview-title-page-separator'></div>
        <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
        <div className='preview-title-page-description'>{`к протоколу осмотра места происшествия от ${photoTableData.dateOMP}  по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}`}</div>
        <div className='preview-title-page-img' onDoubleClick={dbClickHandler} style={backgroundImage}>
          
        </div>
        <div className='preview-title-page-photo-description'>
          <span>{`Фото № ${galleryImages[index].getIndex()}. `}</span>{galleryImages[index].getImgDesc()}</div>
        <div className='preview-title-page-executor'>{`специалист___________${photoTableData.executor}`}</div>
      </div>
    )
  }

  return null
}

export default PreviewPage;