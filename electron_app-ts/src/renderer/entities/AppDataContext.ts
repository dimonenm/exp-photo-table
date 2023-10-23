import { createContext } from 'react'
import { IDownloadedImages, IGallaryImage, IModalProperties, IPhotoTableData, ISettings } from '../interfaces/interfaces';

interface IAppDataContext {
  modalProperties: IModalProperties,
  setModalProperties?: React.Dispatch<React.SetStateAction<IModalProperties>>,
  galleryImages: any[],
  setGalleryImages?: React.Dispatch<[]>,
  galleryImg: IGallaryImage,
  setGalleryImg?: React.Dispatch<React.SetStateAction<IGallaryImage>>,
  photoTableData: IPhotoTableData,
  setphotoTableData?: React.Dispatch<React.SetStateAction<IPhotoTableData>>,
  settings: ISettings,
  setSettings?: React.Dispatch<React.SetStateAction<ISettings>>,
  setDownloadedImages?: React.Dispatch<React.SetStateAction<IDownloadedImages[]>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue: IAppDataContext = {
  modalProperties: {
    isOpen: false,
    type: '',
    nameImg: '',
    urlImg: '',
    textImg: '',
    indexImgInGallery: '',
    cut: false
  },
  galleryImages: [],
  galleryImg: {
    index: 0,
    name: '',
    url: '',
    data: '',
    orientation: '',
    imgDesc: '',
    imgCuted: false,
    lastOffsetValueX: 0,
    lastOffsetValueY: 0,
    zoom: '',
    arrowsColor: '',
    arrowsWidth: '',
    arrowsArray: [],
    contrast: '',
    brightness: '',
    saturate: '',
    rotationDegrees: ''
  },
  photoTableData: {
    numbOMP: '',
    factOMP: '',
    adressOMP: '',
    dateOMP: '',
    dateForDoc: '',
    unit: '',
    kusp: '',
    executor: ''
  },
  settings: {
    address: '',
    executors: [],
    note: '',
    official_status: '',
    tel: '',
    unit: '',
    zip_code: ''
  }
}

export const appDataContext = createContext<IAppDataContext>(defaultValue);