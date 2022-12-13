import React from 'react';

function PreviewTitlePage({galleryImages, index, orientation, isCuted, img, text, photoTableData, settings, setModalProperties }) {

    let imgStyle = {
        width: '100%',
        height: ''
    }
    if (galleryImages[0].getOrientation() === 'panorama') {
        imgStyle.width = '255px'
    }
    if (galleryImages[0].getOrientation() === 'horizontal') {
        imgStyle.width = '225px'
        // imgStyle.height = '150px'
    }
    if (galleryImages[0].getOrientation() === 'vertical') {
        imgStyle.width = '130px'
        imgStyle.height = '175px'
    }
    
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

    return (
        <div className='preview-title-page'>
            <div className='preview-title-page-header'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ<br />ПО РЕСПУБЛИКЕ КРЫМ<br />ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
            <div className='preview-title-page-adres'>{`${settings.zip_code}, ${settings.address} ${settings.tel}`}</div>
            <div className='preview-title-page-separator'></div>
            <div className='preview-title-page-title'>ФОТОТАБЛИЦА</div>
            <div className='preview-title-page-description'>к протоколу осмотра места происшествия от 10.03.2022  по факту кражи имущества по адресу: г. Симферополь, ул. Балаклавская 68" </div>
            <div className='preview-title-page-img'>
                <img className='preview-title-page-img' onDoubleClick={dbClickHandler} src={galleryImages[0].getUrl()} style={imgStyle}></img>
        </div>
            <div className='preview-title-page-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
            <div className='preview-title-page-executor'>{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewTitlePage;