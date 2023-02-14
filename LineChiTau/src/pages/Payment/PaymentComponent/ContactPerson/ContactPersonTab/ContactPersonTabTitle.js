import React from 'react';
function ContactPersonTabTitle(props) {
  return (
    <>
      <button
        className="my-btn contact-user-btn d-flex align-items-center me-1"
        onClick={() => {
          props.updateTab(props.id);
        }}
      >
        {props.title}
      </button>
    </>
  );
}

export default ContactPersonTabTitle;
