import React from 'react';
import './ProgressBar.scss';
import Step from './ProgressBarStep/Step';
const ProgressBar = (props) => {
  const labelArray = ['選擇商品', '填寫訂單', '確認付款'];

  return (
    <>
      <div className="container main-width step-bar d-flex flex-row  align-items-center justify-content-between my-5 px-3">
        {labelArray.map((item, index) => (
          <Step
            key={index}
            index={index}
            label={item}
            currentStep={props.currentStep}
            selected={props.currentStep === index + 1}
            length={labelArray.length}
          ></Step>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;
