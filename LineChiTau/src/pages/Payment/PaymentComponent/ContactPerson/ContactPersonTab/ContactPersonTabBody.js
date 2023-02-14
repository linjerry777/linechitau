import React, { useState } from 'react';
import EditContactPersonModal from '../ContactPersonModal/EditContactPersonModal';

function ContactPersonTabBody(props) {
  return (
    <>
      <div
        className={
          'item d-flex align-items-center p-3 ' +
          (props.currentTab === props.id ? '' : 'd-none')
        }
      >
        {props.currentTab === props.id && (
          <div className="item-user row col-12 position-relative">
            <div className="user-content ">
              <h5>
                姓名: <small>{props.content.name}</small>
              </h5>
              <h5>
                電話: <small>{props.content.phone}</small>
              </h5>
              <h5>
                信箱: <small>{props.content.email}</small>
              </h5>
              <button
                className="my-edit-btn d-flex align-items-center position-absolute bottom-0 end-0"
                onClick={() => {
                  props.updateEditModalOpen(true);
                }}
              >
                <span className="material-symbols-rounded me-2">
                  account_circle
                </span>
                編輯
              </button>
              {props.editModalOpen && (
                <EditContactPersonModal
                  updateEditModalOpen={props.updateEditModalOpen}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactPersonTabBody;
