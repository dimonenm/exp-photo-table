import React from 'react';
import GallaryImage from '../../entities/GalleryImage';
import ImageViewer from './ImageViewer';


function PreviewPage({ type, parity, pageNumber, img1, img2, img3, img4, galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, }) {

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
      <div className='preview-page'>
        <div className='preview-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='preview-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
        <div className='preview-page-separator'></div>
        <div className='preview-page-title'>ФОТОТАБЛИЦА</div>
        <div className='preview-page-description'>{`к протоколу осмотра места происшествия от ${photoTableData.dateOMP}  по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}`}</div>
        
        <ImageViewer
          img={img1}
          galleryImages={galleryImages}
          setGalleryImages={setGalleryImages}
          setModalProperties={setModalProperties}
          currentGalleryImage={currentGalleryImage}
          setCurrentGalleryImage={setCurrentGalleryImage}
        />

        <div className='preview-page-executor'>{`специалист___________${photoTableData.executor}`}</div>
      </div>
    )
  } else if (type === 'page') {
    if (img1 === undefined) {
      return (
        <div className='preview-page'>
          <div className="preview-page-number">{pageNumber}</div>
          <div className='preview-page-plus'
            onDragOver={dragover}
            onDragEnter={dragenter}
            onDragLeave={dragleave}
            onDrop={dragdrop}
          ></div>
          <div className="preview-page-executor">{`специалист___________${photoTableData.executor}`}</div>
        </div>
      )
    }
    if (img1 && img3 === undefined) {
      return (
        <div className='preview-page'>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewer
            img={img1}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <div className='preview-page-plus'
            onDragOver={dragover}
            onDragEnter={dragenter}
            onDragLeave={dragleave}
            onDrop={dragdrop}
          ></div>
          <div className="preview-page-executor">{`специалист___________${photoTableData.executor}`}</div>
        </div>
      )
    }
    if (img1 && img3) {
      return (
        <div className='preview-page'>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewer
            img={img1}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <ImageViewer
            img={img3}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <div className="preview-page-executor">{`специалист___________${photoTableData.executor}`}</div>
        </div>
      )
    }
  }

  return null
}

export default PreviewPage;