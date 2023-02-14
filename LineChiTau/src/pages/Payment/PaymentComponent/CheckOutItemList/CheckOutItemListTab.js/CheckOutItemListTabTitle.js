import React from 'react';
function CheckOutItemListTabTitle(props) {
  console.log('tab title props.current', props.currentTab);
  console.log('tab title props.id', props.id);
  return (
    <>
      <div
        className={
          'sub-detail py-2 mb-2 cart-pointer ' +
          (props.currentTab === props.id ? 'tabActive' : 'tabUnActive')
        }
        onClick={() => {
          props.updateTab(props.id);
        }}
      >
        {props.title}
      </div>
    </>
  );
}

export default CheckOutItemListTabTitle;
