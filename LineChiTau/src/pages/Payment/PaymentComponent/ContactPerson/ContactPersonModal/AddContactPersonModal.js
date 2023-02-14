import React from 'react';
import './ModalSass/AddContactPersonModal.scss';

function AddContactPersonModal({setOpenModal}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer p-4">
        <div className="titleCloseBtn mb-3">
          <div className="title">
            <h4>新增參加人資料</h4>
          </div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="body py-3">
          <form>
            <div className="d-flex align-items-center mb-3">
              <h5 className="py-0 my-0 text-end me-3">
                <label htmlFor="">姓名</label>
              </h5>
              <input type="text" className="form-control border-0 w-auto" />
            </div>
            <div className="d-flex align-items-center mb-3">
              <h5 className="py-0 my-0 text-end me-3">
                <label htmlFor="">電話</label>
              </h5>
              <input type="text" className="form-control border-0 w-auto" />
            </div>
            <div className="d-flex align-items-center mb-3">
              <h5 className="py-0 my-0 text-end me-3">
                <label htmlFor="">信箱</label>
              </h5>
              <input type="text" className="form-control border-0 w-auto" />
            </div>
          </form>
        </div>
        <div className="row justify-content-between px-3">
          <button
            className="my-btn col-5"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            取消
          </button>
          <button className="my-btn col-5">儲存</button>
        </div>
      </div>
    </div>
  );
}

export default AddContactPersonModal;
