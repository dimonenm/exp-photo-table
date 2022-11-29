import React from 'react';

function PreviewDefaultPage({ number, index, orientation, img, text, photoTableData, settings, setModalProperties }) {
    console.log(orientation)
    
    const imagesArr = []
    const dbClickFirstImgHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: index[0]
                }
            );
        }
        )
    }
    const dbClickSecondImgHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: index[1]
                }
            );
        }
        )
    }

    if (index[0] && img[0] && orientation[0] === 'vertical') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-vertical" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[0] && img[0] && orientation[0] === 'horizontal') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[0] && img[0] && orientation[0] === '6X9' && index[1] && img[1] && orientation[1] !== '6X9') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-6X9" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description-6X9"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[0] && img[0] && orientation[0] === '9X6') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-9X6" onDoubleClick={dbClickFirstImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                <div className="preview-default-page-photo-description-9X6"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[1] && img[1] && orientation[1] === 'vertical') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-vertical" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[1] && img[1] && orientation[1] === 'horizontal') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[1] && img[1] && orientation[1] === '6X9' && index[0] && img[0] && orientation[0] !== '6X9') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-6X9" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description-6X9"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[1] && img[1] && orientation[1] === '9X6') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-9X6" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                <div className="preview-default-page-photo-description-9X6"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
    }
    if (index[0] && img[0] && orientation[0] === '6X9' && index[1] && img[1] && orientation[1] === '6X9') {
        imagesArr.push((
            <>
                <div className="preview-default-page-img-6X9-two">
                <div className="preview-default-page-img-6X9" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[0]})` }}></div>
                {/* <div className="preview-default-page-photo-description-6X9"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div> */}
                <div className="preview-default-page-img-6X9" onDoubleClick={dbClickSecondImgHandler} style={{ backgroundImage: `url(${img[1]})` }}></div>
                {/* <div className="preview-default-page-photo-description-6X9"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div> */}
                </div>
                {/* <div className="preview-default-page-note">{settings.note}</div> */}
            </>))
       
    }





    return (
        <div className="preview-default-page">
            <div className="preview-default-page-number">{number}</div>
            {imagesArr}
            <div className="preview-default-page-executor">{`специалист___________${settings.executors[0]}`}</div>
        </div>
    );
}

export default PreviewDefaultPage;