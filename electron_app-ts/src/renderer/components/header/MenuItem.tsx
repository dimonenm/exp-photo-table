import React, { useContext } from 'react';
import { IDownloadedImages } from '../../interfaces/interfaces';
import { appDataContext } from '../../entities/AppDataContext';
import GallaryImage from '../../entities/GalleryImage';
import WordDocument from '../../entities/WordDocument';

interface IMenuItemDto {
  children: string,
  type: string,
}

const MenuItem = ({ children, type }: IMenuItemDto) => {

  // { children, type, notActive, setDownloadedImages, galleryImages, photoTableData, modalProperties, setModalProperties, settings }

  const menuItemAppDataContext = useContext(appDataContext);

  // обработчики событий
  function notActiveInputButtonHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
  }
  function downloadImagesHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    openFile()
  }

  //служебные функции
  
  const openFile = async (): Promise<void> => {
    // async function readFileAsDataURL(file: Blob) {
    //   const result_base64 = await new Promise((resolve) => {
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => {
    //       const dataUrlPrefix = `data:image/png;base64,`;
    //       const base64WithDataUrlPrefix = fileReader.result as string;
    //       const base64 = dataUrlPrefix + base64WithDataUrlPrefix.split(',')[1]
    //       resolve(base64)
    //       // resolve(fileReader.result)
    //     };
    //     fileReader.readAsDataURL(file);
    //   });

    //   return result_base64;
    // }

    menuItemAppDataContext.setIsLoading(true)
    
    // const base64: string[] = []
    // const arrImgs: JSX.Element[] = []
    const receivedImages: IDownloadedImages[] = await window.electronAPI.openFile()
    
    menuItemAppDataContext.setDownloadedImages(receivedImages)
    
    // const buffer: Uint8Array[] = await window.electronAPI.openFile()

    // const blobs: Blob[] = buffer.map((item) => {
    //   return new Blob([item])
    // })

    // for (let i = 0; i < blobs.length; i++) {
    //   const dataURL = await readFileAsDataURL(blobs[i])
    //   base64.push(dataURL as string)
    // }

    // for (const item of base64) {
    //   const img = <img key={item.length} src={item} width={150} height={216}></img>
    //   arrImgs.push(img)
    // }

    // setImgs(arrImgs)
  }

  // function loadImgs(event) {
  //   event.preventDefault();
  //   const input = document.querySelector('.file');
  //   function change() {
  //     const imagedata = [];

  //     for (let i = 0; i < input.files.length; i++) {
  //       imagedata.push({ name: input.files[i].name, url: URL.createObjectURL(input.files[i]) });
  //     }

  //     setDownloadedImages(imagedata)
  //     input.removeEventListener('change', change);
  //   }
  //   input.click();
  //   input.addEventListener('change', change);
  // }
  // function delImgFromPhotoTable(event) {
  //   event.preventDefault()

  //   const filteredGalleryImages = [...localModalProperties.galleryImages].filter((item) => {
  //     if (item.getIndex() === localModalProperties.modalProperties.indexImgInGallery) {
  //       return false;
  //     }
  //     return true;
  //   });
    
  //   for (let i = 0; i < filteredGalleryImages.length; i++) {
  //     filteredGalleryImages[i].setIndex(i + 1);
  //   }

  //   localModalProperties.setGalleryImages(filteredGalleryImages);
  //   localModalProperties.setGalleryImg(new GallaryImage())
  //   localModalProperties.setModalProperties(() => {
  //     return {
  //       isOpen: false,
  //       type: null,
  //       indexImgInGallery: null
  //     }
  //   });
  // }
  // function forEditPhoto(event) {
  //   event.preventDefault();

  //   localModalProperties.setModalProperties(() => {
  //     return {
  //       ...localModalProperties.modalProperties,
  //       type: 'editPhoto'
  //     }
  //   });
  // }
  // async function convertToMicrosoftWord(event) {
  //   event.preventDefault();
  //   const isNotAllImgsCutted = galleryImages.find((item) => {
  //     if (item.getImgCuted() === false) {
  //       return true
  //     }
  //     return false
  //   })

  //   if (isNotAllImgsCutted) {
  //     const conf = confirm('У вас остались не обрезанные фотографии. Вы уверенны что хотите сформировать документ?')
  //     if (conf) {
  //       const wordDocument = new WordDocument(galleryImages, photoTableData, settings);
  //       await wordDocument.addPages();
  //       wordDocument.saveDocument();
  //     }
  //   } else {
  //     const wordDocument = new WordDocument(galleryImages, photoTableData, settings);
  //     await wordDocument.addPages();
  //     wordDocument.saveDocument();
  //   }

  // }
  // function forSetSettingsModal(event) {
  //   event.preventDefault();

  //   setModalProperties(() => {
  //     return {
  //       ...modalProperties,
  //       isOpen: true,
  //       type: 'setSettings'
  //     }
  //   });
  // }
  // function forsetPhotoTableData(event) {
  //   event.preventDefault();
  //   setModalProperties(prev => {
  //     return (
  //       {
  //         ...prev,
  //         isOpen: true,
  //         type: "setPhotoTableData"
  //       }
  //     );
  //   }
  //   )
  // }
  // function forAbout(event) {
  //   event.preventDefault();

  //   setModalProperties(prev => {
  //     return (
  //       {
  //         ...prev,
  //         isOpen: true,
  //         type: "about"
  //       }
  //     );
  //   }
  //   )
  // }




  if (type === 'notActiveInputButton') {
    return (
      <div className="menu-item menu-not-active"><a href="/" onClick={notActiveInputButtonHandler}>{children}</a></div>
    );
  }
  if (type === 'downloadImages') {
    return (
      <div className="menu-item"><a href="/" onClick={downloadImagesHandler}>{children}</a></div>
    );
  }
  // if (type === 'forInputFile') {
  //   return (
  //     <div className="menu-item input-file">
  //       <input type="file" className="file" multiple={true} accept="image/*"></input>
  //       <a href="/" onClick={loadImgs}>{children}</a>
  //     </div>
  //   );
  // }
  // if (type === 'forConvertToMicrosoftWord') {
  //   return (
  //     <div className="menu-item" onClick={convertToMicrosoftWord}><a href="/" >{children}</a></div>
  //   );
  // }
  // if (type === 'forSettings') {
  //   return (
  //     <div className="menu-item" onClick={forSetSettingsModal}><a href="/" >{children}</a></div>
  //   );
  // }
  // if (type === 'forsetPhotoTableData') {
  //   return (
  //     <div className="menu-item" onClick={forsetPhotoTableData}><a href="/" >{children}</a></div>
  //   );
  // }
  // if (type === 'forDelImgFromPhotoTable') {
  //   return (
  //     <div className="menu-item" onClick={delImgFromPhotoTable}><a href="/" >{children}</a></div>
  //   );
  // }
  // if (type === 'forEditPhoto') {
  //   return (
  //     <div className="menu-item" onClick={forEditPhoto}><a href="/" >{children}</a></div>
  //   );
  // }
  // if (type === 'forAbout') {
  //   return (
  //     <div className="menu-item" onClick={forAbout}><a href="/" >{children}</a></div>
  //   );
  // }
  return (
    null
    // <div className="menu-item"><a href="/" >{children}</a></div>
  );
}

export default MenuItem;