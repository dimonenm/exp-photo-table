import "./ModalContentEmployeeItem.css";

const ModalContentEmployeeItem = ({ name }) => {

  return (
    <div className="modal-content-grid-settings-list-item">
      <div className="modal-content-grid-settings-list-item-name">{ name }</div>
      <div className="modal-content-grid-settings-list-item-del-btn"></div>
    </div>
  );
}
export default ModalContentEmployeeItem;