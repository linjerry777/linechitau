import { useState } from 'react';
export default function AreaSelect({ area }) {
  const [beingActive, setBeingActive] = useState();

  // function handleSetBeingActive() {}

  retrun(
    <>
      <div className="area d-felx align-items-center position-relative">
        <div
          className="d-flex align-items-center justify-content-between"
          title="目的地所在地只能選擇一個"
          onClick={handleSetEastern}
        >
          {area}
          <span className="arrow-right material-symbols-outlined">
            arrow_right
          </span>
        </div>
        <div
          className={
            'counties-wrapper position-absolute\t' +
            (beingActive.eastern ? 'active' : '')
          }
          onMouseLeave={handleResetAcitve}
        >
          {easternItems}
        </div>
      </div>
    </>
  );
}
