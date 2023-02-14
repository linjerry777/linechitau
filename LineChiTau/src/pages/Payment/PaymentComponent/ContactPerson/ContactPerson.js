import React, { useState } from 'react';
import AddContactPersonModal from './ContactPersonModal/AddContactPersonModal';
import ContactPersonTabTitle from './ContactPersonTab/ContactPersonTabTitle';
import ContactPersonTabBody from './ContactPersonTab/ContactPersonTabBody';
const ContactPerson = (props) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);

  return (
    <>
      <div className="contact-title d-flex align-items-center p-0">
        <h3 className="title">聯絡人資料</h3>
        <small className="ms-2">如果訂單有變動狀況將會通知您</small>
      </div>

      <div className="item-user row col-12 position-relative">
        <div className="user-content row">
        <h5 className='col-6'>
            姓名:{' '}
            <input
              type="text"
              id="name"
              name="name"
              className="form-control border-0 col-6"
              value={props.name}
              onChange={(event) => {
                props.updateValue.setName(event.target.value);
                console.log(props.lastName);
              }}
            />
          </h5>
          <h5 className='col-6'>
            電話:
            <input
              type="tel"
              id="tel"
              name="tel"
              className="form-control border-0 "
              value={props.tel}
              onChange={(event) => {
                props.updateValue.setTel(event.target.value);
                console.log(props.lastName);
              }}
            />
          </h5>
          <h5 className=''>
            信箱:
            <input
              type="email"
              id="email"
              name="email"
              className="form-control border-0 "
              value={props.email}
              onChange={(event) => {
                props.updateValue.setEmail(event.target.value);
                console.log(props.lastName);
              }}
            />
          </h5>
          <h5 className='col-6'>
            國家 / 地區:{' '}
            <input
              type="text"
              id="country"
              name="country"
              className="form-control border-0 col-6"
              value={props.country}
              onChange={(event) => {
                props.updateValue.setCountry(event.target.value);
                console.log(props.country);
              }}
            />
          </h5>
          <h5 className='col-6'>
            語言:{' '}
            <input
              type="text"
              id="lang"
              name="lang"
              className="form-control border-0 "
              value={props.lang}
              onChange={(event) => {
                props.updateValue.setLang(event.target.value);
                console.log(props.lastName);
              }}
            />
          </h5>
        </div>
      </div>
    </>
  );
};

export default ContactPerson;
