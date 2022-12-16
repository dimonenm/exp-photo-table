import React from 'react';
import ImageViewer from './ImageViewer';
import ImageViewerFor6X9 from './ImageViewerFor6X9';
function PreviewTitlePage({ galleryImages, index, settings, setModalProperties }) {

   



    return (
        <div className='preview-title-page'>
            <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
            <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
            <div className='preview-title-page-separator'></div>
            <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
            <div className='preview-title-page-description'>к протоколу осмотра места происшествия от 10.03.2022  по факту кражи имущества по адресу: г. Симферополь, ул. Балаклавская 68" </div>
            {/* <ImageViewerFor6X9
                img={galleryImages[0]}
                setModalProperties={setModalProperties}
            
            /> */}
            <ImageViewer
                img={galleryImages[0]}
                setModalProperties={setModalProperties}
            />
            <div className='preview-title-page-executor'>{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewTitlePage;