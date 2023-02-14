import React from 'react';
import './Modal.scss';

function AddCartModal(props) {
  const storage = localStorage;
  return (
    <div className="modalBackground">
      <div className="modalContainer p-4">
        <div className="titleCloseBtn mb-3">
          <div className="title">
            <h4>加入購物車</h4>
          </div>
          <button
            onClick={() => {
                props.updateValue.setModalOpen(false);

            }}
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="body py-3">加入成功</div>
        <div className="row justify-content-between px-3">
          <button
            className="my-btn col-5"
            onClick={() => {
              props.updateValue.setModalOpen(false);
            }}
          >
            繼續購物
          </button>
          <button
            className="my-btn col-5"
            onClick={() => {
              storage.setItem('cart', JSON.stringify(props.cartItems));
            }}
          >
            進入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCartModal;
