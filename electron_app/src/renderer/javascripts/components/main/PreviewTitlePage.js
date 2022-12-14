import React from 'react';
import ImageViewer from './ImageViewer';
function PreviewTitlePage({ galleryImages, index, settings, setModalProperties }) {

    const imgStyle = {
        width: '255',
        height: ''
    }
    const marginForSpan = {
        marginLeft: '0'
}
    if (galleryImages[0].getOrientation() === 'panorama' && galleryImages[0].getImgCuted()) {
        imgStyle.width = '255px'
    }
    if (galleryImages[0].getOrientation() === 'horizontal' && galleryImages[0].getImgCuted()) {
        imgStyle.width = '225px'
        marginForSpan.marginLeft = '15px'
        // imgStyle.height = '150px'
    }
    if (galleryImages[0].getOrientation() === 'vertical' && galleryImages[0].getImgCuted()) {
        imgStyle.width = '130px'
        marginForSpan.marginLeft = '62px'
        // imgStyle.height = '175px'
    }



    return (
        <div className='preview-title-page'>
            <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
            <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
            <div className='preview-title-page-separator'></div>
            <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
            <div className='preview-title-page-description'>к протоколу осмотра места происшествия от 10.03.2022  по факту кражи имущества по адресу: г. Симферополь, ул. Балаклавская 68" </div>
        
            <ImageViewer
                galleryImages={galleryImages}
                img={galleryImages[0].getUrl()}
                index={galleryImages[0].getIndex()}
                text={galleryImages[0].getImgDesc()}
                setModalProperties={setModalProperties}
                imgStyle={imgStyle}
                marginForSpan={marginForSpan}
            />
            {/* <div className='preview-title-page-img'>
                <img className='preview-title-page-img' onDoubleClick={dbClickHandler} src={galleryImages[0].getUrl()} style={imgStyle}></img>
        </div>
            <div className='preview-title-page-photo-description'>
                <span>{`Фото № ${galleryImages[0].getIndex()}. `}</span>{galleryImages[0].getImgDesc()}</div> */}
            <div className='preview-title-page-executor'>{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewTitlePage;