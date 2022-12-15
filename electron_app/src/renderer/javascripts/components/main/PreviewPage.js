import React from 'react';
import GallaryImage from '../../entities/GalleryImage';
import ImageViewer from './ImageViewer';


function PreviewPage({ type, parity, img1, img2, img3, img4, galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, }) {

  function dragover(event) {
    event.preventDefault();
  }

  function dragenter(event) {
    console.log('dragenter');
    event.target.classList.add('preview-page-plus-hovered');
  }

  function dragleave(event) {
    event.target.classList.remove('preview-page-plus-hovered');
  }

  function dragdrop(event) {
    event.preventDefault();
    event.target.classList.remove('preview-page-plus-hovered');

    const gallaryImage = new GallaryImage()
    gallaryImage.setName(currentGalleryImage.nameImg)
    gallaryImage.setUrl(currentGalleryImage.urlImg)
    const arr = [...galleryImages];
    gallaryImage.setIndex(arr.length + 1);
    arr.push(gallaryImage);

    setGalleryImages(arr);
    setCurrentGalleryImage({ nameImg: null, urlImg: null, textImg: null });
  }

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

  if (type === 'title' && galleryImages.length === 0) {
    return (
      <div className='preview-page'>
        <div className='preview-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='preview-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
        <div className='preview-page-separator'></div>
        <div className='preview-page-title'>ФОТОТАБЛИЦА</div>
        <div className='preview-page-description'>{`к протоколу осмотра места происшествия от ${photoTableData.dateOMP}  по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}`}</div>
        <div className='preview-page-plus'
          onDragOver={dragover}
          onDragEnter={dragenter}
          onDragLeave={dragleave}
          onDrop={dragdrop}
        ></div>
        <div className='preview-page-executor'>{`специалист___________${photoTableData.executor}`}</div>
      </div>
    )
  } else if (type === 'title') {
    return (
      <div className='preview-title-page'>
        <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
        <div className='preview-title-page-separator'></div>
        <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
        <div className='preview-title-page-description'>{`к протоколу осмотра места происшествия от ${photoTableData.dateOMP}  по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}`}</div>
        
        <ImageViewer img={img1} setModalProperties={setModalProperties} />

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