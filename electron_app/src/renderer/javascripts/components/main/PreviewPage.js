import React from 'react';
import GallaryImage from '../../entities/GalleryImage';
import ImageViewer from './ImageViewer';
import ImageViewerFor6X9 from './ImageViewerFor6X9';

function PreviewPage({ type, parity, pageNumber, img1, img2, img3, img4, galleryImages, setGalleryImages, photoTableData, settings, setModalProperties, currentGalleryImage, setCurrentGalleryImage, previewPageScale }) {
  console.log('превью', previewPageScale);
  // const padding = parity === 'odd' ? '13px 13px 13px 26px' : '13px 26px 13px 13px' }
  const pageStyle = {
    ...previewPageScale, padding: `${parity === 'odd' ? '13px 13px 13px 26px' : '13px 26px 13px 13px'}` 
  }

  function dragover(event) {
    event.preventDefault();
  }

  function dragenter(event) {
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
    setCurrentGalleryImage({ nameImg: null, urlImg: null });
  }

  if (type === 'title' && galleryImages.length === 0) {
    return (
      <div className='preview-page' style={pageStyle} >
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
      <div className='preview-page' style={padding}>
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
    console.log('pageNumber', pageNumber);
    if (img1 === undefined) {
      console.log('img1 === undefined');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <div className="preview-page-note">{`${settings.note}`}</div>
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
    if (img1 && img2 === undefined && img3 === undefined && img4 === undefined) {
      console.log('img1 && img2 === undefined && img3 === undefined');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewer
            img={img1}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <div className="preview-page-note">{`${settings.note}`}</div>
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
    if (img1 && img2 && img3 === undefined && img4 === undefined) {
      console.log('img1 && img2 && img3 === undefined');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewerFor6X9
            img1={img1}
            img2={img2}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <div className="preview-page-note">{`${settings.note}`}</div>
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
    if (img1 && img2 === undefined && img3 && img4 === undefined) {
      console.log('img1 && img2 === undefined && img3');
      return (
        <div className='preview-page' style={padding}>
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
    if (img1 && img2 && img3 && img4 === undefined) {
      console.log('img1 && img2 && img3 && img4 === undefined');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewerFor6X9
            img1={img1}
            img2={img2}
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
    if (img1 && img2 === undefined && img3 && img4) {
      console.log('img1 && img2 === undefined && img3 && img4');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewer
            img={img1}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <ImageViewerFor6X9
            img1={img3}
            img2={img4}
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
    if (img1 && img2 && img3 && img4) {
      console.log('img1 && img2 && img3 && img4');
      return (
        <div className='preview-page' style={padding}>
          <div className="preview-page-number">{pageNumber}</div>
          <ImageViewerFor6X9
            img1={img1}
            img2={img2}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            setModalProperties={setModalProperties}
            currentGalleryImage={currentGalleryImage}
            setCurrentGalleryImage={setCurrentGalleryImage}
          />
          <ImageViewerFor6X9
            img1={img3}
            img2={img4}
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