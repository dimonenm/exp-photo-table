import React from 'react';
import ImageViewer from './imageViewer';
function PreviewDefaultPage({ number, index, galleryImages, orientation, img, text, photoTableData, settings, setModalProperties }) {
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

    if (index[0] && img[0] && orientation[0] === 'horizontal') {
        imagesArr.push((
            // <React.Fragment key={index[0]}>
            //     <div className="preview-default-page-img">
            //         <img className="preview-default-page-img-horizontal" onDoubleClick={dbClickFirstImgHandler} src={`${img[0]}`}></img>
            //     </div>
            //     <div className="preview-default-page-photo-description-horizontal"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
            //     {/* <div className="preview-default-page-note">{settings.note}</div> */}
            // </React.Fragment>))
            <ImageViewer
                img={galleryImages[0]}
                setModalProperties={setModalProperties}
            />
        ))
    }

    if (index[0] && img[0] && orientation[0] === 'vertical') {
        imagesArr.push((
            // <React.Fragment key={index[0]}>
            //     <div className="preview-default-page-img">
            //         <img className="preview-default-page-img-vertical" onDoubleClick={dbClickFirstImgHandler} src={`${img[0]}`}></img>
            //     </div>
            //     <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[0]}. `}</span>{text[0]}</div>
            //     {/* <div className="preview-default-page-note">{settings.note}</div> */}
            // </React.Fragment>
            <ImageViewer
                img={galleryImages[0]}
                setModalProperties={setModalProperties}
            />
        ))
    }

    if (index[1] && img[1] && orientation[1] === 'vertical') {
        imagesArr.push((
            // <React.Fragment key={index[1]}>
            //     <div className="preview-default-page-img-vertical" >
            //         <img className="preview-default-page-img-vertical" onDoubleClick={dbClickSecondImgHandler} src={`${img[1]}`}></img>
            //     </div>
            //     <div className="preview-default-page-photo-description-vertical"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
            //     {/* <div className="preview-default-page-note">{settings.note}</div> */}
            // </React.Fragment>
            <ImageViewer
                img={galleryImages[1]}
                setModalProperties={setModalProperties}
            />
        ))
    }
    if (index[1] && img[1] && orientation[1] === 'horizontal') {
        imagesArr.push((
            // <React.Fragment key={index[1]}>
            //     <div className="preview-default-page-img">
            //         <img className="preview-default-page-img-horizontal" onDoubleClick={dbClickSecondImgHandler} src={`${img[1]}`}></img>
            //     </div>
            //     <div className="preview-default-page-photo-description-horizontal"><span>{`Фото № ${index[1]}. `}</span>{text[1]}</div>
            //     {/* <div className="preview-default-page-note">{settings.note}</div> */}
            // </React.Fragment>
            <ImageViewer
                img={galleryImages[0]}
                setModalProperties={setModalProperties}
            />
        ))
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