import React from 'react';

function PreviewPage({ index, type, galleryImages, photoTableData, settings }) {

  console.log('galleryImages[index].getUrl()', galleryImages[index].getUrl());
  const backgroundImage = {
    backgroundImage: `url(${galleryImages[index].getUrl()})`
  }

  console.log('backgroundImage: ', backgroundImage);
  let imgStyle = {
    width: ''
  }
    if (galleryImages[index].getOrientation() === 'panorama') {
    imgStyle.width = '255px'
    }
    if (galleryImages[index].getOrientation() === 'horizontal') {
      imgStyle.width = '225px'
      imgStyle.height = '150px'
    }
 
  console.log(imgStyle.width);
  
  const dbClickHandler = (event) => {
    event.preventDefault();
    setModalProperties(prev => {
      return (
        {
          ...prev,
          isOpen: true,
          type: "editPhoto",
          indexImgInGallery: index
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
        <div className='preview-title-page-img'>
          <img className='preview-title-page-img-panorama' onDoubleClick={dbClickHandler} src={`${galleryImages[index].getUrl()}`} style={imgStyle}></img>
        </div>
        <div className='preview-title-page-photo-description'>
          <span>{`Фото № ${galleryImages[index].getIndex()}. `}</span>{galleryImages[index].getImgDesc()}</div>
        <div className='preview-title-page-executor'>{`специалист___________${photoTableData.executor}`}</div>
      </div>
    )
  }

  return (
    <div className='preview-title-page'>
      {/* <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
      <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
      <div className='preview-title-page-separator'></div>
      <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
      <div className='preview-title-page-description'>к протоколу осмотра места происшествия от 10.03.2022  по факту кражи имущества по адресу: г. Симферополь, ул. Балаклавская 68" </div>
      <div className='preview-title-page-img' onDoubleClick={dbClickHandler} style={backgroundImage}></div>
      <div className='preview-title-page-photo-description'>
        <span>{`Фото № ${index}. `}</span>{text}</div>
      <div className='preview-title-page-executor'>{`специалист___________${settings.executors[0]}`}</div> */}
    </div>
  );
}

export default PreviewPage;