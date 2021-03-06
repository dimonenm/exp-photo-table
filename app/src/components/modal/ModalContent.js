import React, { useState, useEffect, useContext } from 'react';
// import AvatarEditor from 'react-avatar-editor';
import ModalContentEmployeeItem from './ModalContentEmployeeItem';
import regexpCheckingComplianceInitialsSurname from '../../services/forModalContent/fRegexpCheckingComplianceInitialsSurname';
import ModalCanvas from './canvas/ModalCanvas';
import ModalContentPreview from './ModalContentPreview';
import { modalDataContext } from '../../App';
import './ModalContent.css'
import './ModalContentGrid.css'

const ModalContent = () => {

  const localModalProperties = useContext(modalDataContext);

  // const [editorData, setEditorData] = useState({
  //   width: 700,
  //   height: 525,
  //   zoom: 1
  // });
  const [canvas] = useState();
  // const [canvas, setCanvas] = useState();
  const [newEmployee, setNewEmployee] = useState('');

  function onClickSave() {

    fetch(canvas.getImage().toDataURL())
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);

        const tempGalleryImages = [...localModalProperties.galleryImages];
        tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].urlImg = url;
        localModalProperties.setGalleryImages(tempGalleryImages);
        localModalProperties.setModalProperties((prev) => {
          return {
            ...prev,
            urlImg: url
          }
        });
      });

    localModalProperties.setModalProperties((prev) => {
      return {
        ...prev,
        type: "setGalleryImageData",
        cut: false
      }
    })
  }

  useEffect(() => {
    if (localModalProperties.modalProperties.cut) {
      onClickSave();
    }
  })

  if (localModalProperties.modalProperties.type === "preview") {
    return (<ModalContentPreview />);
    // return (
    //   <div className="modal-content">
    //     {/* <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img> */}
    //   </div>
    // );
  }
  if (localModalProperties.modalProperties.type === "setSettings") {
    const changeNoteHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, note: event.target.value }) }) }
    const changeUnitHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, unit: event.target.value }) }) }
    const changeNewEmployeeHandler = (event) => { setNewEmployee(event.target.value) }
    const clickNewEmployeeHandler = () => {
      if (newEmployee !== '' && regexpCheckingComplianceInitialsSurname(newEmployee)) {

        if (localModalProperties.settings.executors.find(item => item === newEmployee)) {
          console.log('?????????????????? ?????? ????????????????');
          return;
        }

        localModalProperties.setSettings((prev) => {
          const arrNewExecutors = localModalProperties.settings.executors;
          arrNewExecutors.push(newEmployee);
          return ({ ...prev, executors: arrNewExecutors })
        })

        setNewEmployee('');
      } else {
        console.log('?????????????????? ???? ????????????????');
      }
    }

    return (
      <div className="modal-content-grid">
        <div className="modal-content-grid-settings-container modal-content-grid-settings-note">
          <div className="modal-content-grid-settings-title">????????????????????</div>
          <div className="modal-content-grid-settings-textarea">
            <textarea onChange={changeNoteHandler} value={localModalProperties.settings.note}></textarea>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-employee">
          <div className="modal-content-grid-settings-title">?????? ???????????? ????????????????????</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeNewEmployeeHandler} value={newEmployee}></input>
            <div className="plus-btn" onClick={clickNewEmployeeHandler}></div>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-unit">
          <div className="modal-content-grid-settings-title">??????????????????</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeUnitHandler} value={localModalProperties.settings.unit}></input>
          </div>
        </div>
        <div className="modal-content-grid-settings-employee-list">
          <div className="modal-content-grid-settings-title">???????????? ??????????????????????</div>
          <div className="modal-content-grid-settings-list">
            {localModalProperties.settings.executors.map((item, index) => {
              return (<ModalContentEmployeeItem key={index} name={item} />)
            })}
          </div>
        </div>
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "setPhotoTableData") {

    const changeNumbOMPHandler = () => {
      const str = document.querySelector('.numbOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          numbOMP: str.value
        })
      })
    };
    const changeFactOMPHandler = () => {
      const str = document.querySelector('.factOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          factOMP: str.value
        })
      })
    };
    const changeAdressOMPHandler = () => {
      const str = document.querySelector('.adressOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          adressOMP: str.value
        })
      })
    };
    const changeDateOMPHandler = () => {
      const str = document.querySelector('.dateOMP');
      const date = new Date(str.value)

      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          dateOMP: str.value,
          dateForDoc: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
        })
      })
    };
    const changeUnitHandler = () => {
      const str = document.querySelector('.unit');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          unit: str.value
        })
      })
    };
    const changeKuspHandler = () => {
      const str = document.querySelector('.kusp');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          kusp: str.value
        })
      })
    };
    const changeExecutorHandler = () => {
      const str = document.querySelector('.executor');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          executor: str.value
        })
      })
    };

    return (
      <div className="modal-content-data">
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">??? ???? ?????????????? ??????</div>
            <input
              type="number"
              className="numbOMP"
              onChange={changeNumbOMPHandler}
              value={localModalProperties.photoTableData.numbOMP ?
                localModalProperties.photoTableData.numbOMP :
                ''}
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">???????? ???????????????????? ??????:</div>
            <textarea
              className="factOMP"
              onChange={changeFactOMPHandler}
              rows={3}
              placeholder="?????????????? ???????? ???????????????????? ??????..."
              value={
                localModalProperties.photoTableData.factOMP ?
                  localModalProperties.photoTableData.factOMP :
                  ''}
            />
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">?????????? ???????????????????? ??????:</div>
            <textarea
              className="adressOMP"
              onChange={changeAdressOMPHandler}
              rows={3}
              placeholder="?????????????? ?????????? ???????????????????? ??????..."
              value={
                localModalProperties.photoTableData.adressOMP ?
                  localModalProperties.photoTableData.adressOMP :
                  ''}
            />
          </div>
        </div>
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">???????? ??????????????????????:</div>
            <input
              type="date"
              className="dateOMP"
              onChange={changeDateOMPHandler}
              value={
                localModalProperties.photoTableData.dateOMP ?
                  localModalProperties.photoTableData.dateOMP :
                  ''}
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">??????????????????</div>
            <input
              type="text"
              className="unit"
              onChange={changeUnitHandler}
              value={
                localModalProperties.photoTableData.unit ?
                  localModalProperties.photoTableData.unit :
                  localModalProperties.settings.unit ?
                    localModalProperties.settings.unit :
                    ''}
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">????????</div>
            <input
              type="text"
              className="kusp"
              onChange={changeKuspHandler}
              value={
                localModalProperties.photoTableData.kusp ?
                  localModalProperties.photoTableData.kusp :
                  ''}
            ></input>
          </div>
        </div>
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">??????????????????????</div>
            <select
              className="executor"
              onChange={changeExecutorHandler}
            >
              {localModalProperties.settings.executors ?
                localModalProperties.settings.executors.map((item, index) => { return (<option key={index} >{item}</option>) }) :
                <option >???????????? ??????????????????????</option>
              }
            </select>
          </div>
        </div>
      </div >
    );
  }

  // if (localModalProperties.modalProperties.type === "setGalleryImageData") {

  //   const changeIllustrationDescriptionHandler = () => {
  //     const str = document.querySelector('.illustrationDescription');
  //     localModalProperties.setModalProperties((prev) => {
  //       return ({
  //         ...prev,
  //         textImg: str.value
  //       })
  //     })
  //   };

  //   return (
  //     <div className="modal-content-data">
  //       <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
  //       <div className="modal-content-title">????????????????:</div>
  //       <textarea
  //         className="illustrationDescription"
  //         onChange={changeIllustrationDescriptionHandler}
  //         rows={5}
  //         placeholder="?????????????? ???????????????? ?????? ??????????????????????..."
  //         value={
  //           localModalProperties.modalProperties.textImg ?
  //             localModalProperties.modalProperties.textImg :
  //             ''}
  //       />
  //     </div>
  //   );
  // }

  // if (localModalProperties.modalProperties.type === "cutPhoto") {
  //   const inputChangeHandler = (event) => {
  //     setEditorData((prev) => {
  //       return { ...prev, zoom: +event.target.value }
  //     });
  //   }
  //   const orientationVerticalClickHandler = () => {
  //     const tempGalleryImages = [...localModalProperties.galleryImages];
  //     tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].orientation = 'vertical';
  //     localModalProperties.setGalleryImages(tempGalleryImages);

  //     setEditorData((prev) => {
  //       return { ...prev, width: 393, height: 525 }
  //     });
  //   }
  //   const orientationHorizontalClickHandler = () => {
  //     const tempGalleryImages = [...localModalProperties.galleryImages];
  //     tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].orientation = 'horizontal';
  //     localModalProperties.setGalleryImages(tempGalleryImages);

  //     setEditorData((prev) => {
  //       return { ...prev, width: 700, height: 525 }
  //     });
  //   }

  //   const setEditorRef = (editor) => {
  //     setCanvas(editor);
  //   };

  //   return (
  //     <div className="modal-content-data">
  //       <AvatarEditor
  //         ref={setEditorRef}
  //         image={localModalProperties.modalProperties.urlImg}
  //         width={editorData.width}
  //         height={editorData.height}
  //         border={0}
  //         color={[0, 0, 0, 0.8]} // RGBA
  //         scale={editorData.zoom}
  //         rotate={0}
  //       />
  //       <div className="modal-content-data-controls">
  //         <div className="modal-content-data-controls-orientation">
  //           <div className="modal-content-data-controls-orientation-title">????????????????????:</div>
  //           <div
  //             className="modal-content-data-controls-orientation-vertical"
  //             onClick={orientationVerticalClickHandler}
  //           >????????????????????????</div>
  //           <div
  //             className="modal-content-data-controls-orientation-horizontal"
  //             onClick={orientationHorizontalClickHandler}
  //           >????????????????????????????</div>
  //         </div>
  //         <div className="modal-content-data-controls-zoom">
  //           <div className="modal-content-data-controls-zoom-title">????????????????????:</div>
  //           <div className="modal-content-data-controls-zoom-range">
  //             <input
  //               type="range"
  //               step="0.1"
  //               min="0.1"
  //               max="2"
  //               value={editorData.zoom}
  //               onChange={inputChangeHandler}
  //             ></input>
  //           </div>
  //           <div>{editorData.zoom}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  if (localModalProperties.modalProperties.type === "editPhoto") {
    return (
      <ModalCanvas />
    );
  }

}

export default ModalContent;