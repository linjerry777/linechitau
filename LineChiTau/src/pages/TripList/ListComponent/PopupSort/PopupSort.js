import './PopupSort.scss';
import { useState } from 'react';
export default function PopupSort(props) {
  const { label, area, setNewRawKeyword } = props;

  const initState = {
    northern: false,
    central: false,
    southern: false,
    eastern: false,
    island: false,
  };

  const [beingActive, setBeingActive] = useState(initState);

  function handleSetNorthern() {
    setBeingActive({
      ...beingActive,
      northern: true,
    });
    console.log(beingActive);
  }
  function handleSetCentral() {
    setBeingActive({
      ...beingActive,
      central: true,
    });
    console.log(beingActive);
  }
  function handleSetSouthern() {
    setBeingActive({
      ...beingActive,
      southern: true,
    });
    console.log(beingActive);
  }
  function handleSetEastern() {
    setBeingActive({
      ...beingActive,
      eastern: true,
    });
    console.log(beingActive);
  }
  function handleSetIsland() {
    setBeingActive({
      ...beingActive,
      island: true,
    });
    console.log(beingActive);
  }
  function handleResetAcitve() {
    console.log('觸發rest');
    setBeingActive(initState);
    console.log(beingActive);
  }

  const northernList = ['基隆', '宜蘭', '台北', '桃園', '新竹'];
  const centralList = ['苗栗', '台中', '彰化', '南投', '雲林'];
  const southernList = ['嘉義', '台南', '高雄', '屏東'];
  const easternList = ['台東', '花蓮'];
  const islandList = ['澎湖', '金門', '馬祖', '蘭嶼'];

  const northernItems = northernList.map((v) => (
    <div
      className={'d-flex justify-content-center keyword-select'}
      onClick={setNewRawKeyword({ v })}
    >
      {v}
    </div>
  ));
  const centralItems = centralList.map((v) => (
    <div className={'d-flex justify-content-center keyword-select'}>{v}</div>
  ));
  const southernItems = southernList.map((v) => (
    <div className={'d-flex justify-content-center keyword-select'}>{v}</div>
  ));
  const easternItems = easternList.map((v) => (
    <div className={'d-flex justify-content-center keyword-select'}>{v}</div>
  ));
  const islandItems = islandList.map((v) => (
    <div className={'d-flex justify-content-center keyword-select'}>{v}</div>
  ));

  switch (area) {
    case 'northern':
      return (
        <>
          <div
            className="area d-felx align-items-center position-relative"
            onClick={handleSetNorthern}
          >
            <div
              className="d-flex align-items-center justify-content-between"
              title="目的地所在地只能選擇一個"
              id="northern"
              value="true"
            >
              {label}
              <span className="arrow-right material-symbols-outlined">
                arrow_right
              </span>
            </div>
            <div
              className={
                'counties-wrapper position-absolute\t' +
                (beingActive.northern ? 'active' : '')
              }
              onMouseLeave={handleResetAcitve}
            >
              {northernItems}
            </div>
          </div>
        </>
      );
    case 'central':
      return (
        <>
          <div className="area d-felx align-items-center position-relative">
            <div
              className="d-flex align-items-center justify-content-between"
              title="目的地所在地只能選擇一個"
              onClick={handleSetCentral}
            >
              {label}
              <span className="arrow-right material-symbols-outlined">
                arrow_right
              </span>
            </div>
            <div
              className={
                'counties-wrapper position-absolute\t' +
                (beingActive.central ? 'active' : '')
              }
              onMouseLeave={handleResetAcitve}
            >
              {centralItems}
            </div>
          </div>
        </>
      );
    case 'southern':
      return (
        <>
          <div className="area d-felx align-items-center position-relative">
            <div
              className="d-flex align-items-center justify-content-between"
              title="目的地所在地只能選擇一個"
              onClick={handleSetSouthern}
            >
              {label}
              <span className="arrow-right material-symbols-outlined">
                arrow_right
              </span>
            </div>
            <div
              className={
                'counties-wrapper position-absolute\t' +
                (beingActive.southern ? 'active' : '')
              }
              onMouseLeave={handleResetAcitve}
            >
              {southernItems}
            </div>
          </div>
        </>
      );
    case 'eastern':
      return (
        <>
          <div className="area d-felx align-items-center position-relative">
            <div
              className="d-flex align-items-center justify-content-between"
              title="目的地所在地只能選擇一個"
              onClick={handleSetEastern}
            >
              {label}
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
    case 'island':
      return (
        <>
          <div className="area d-felx align-items-center position-relative">
            <div
              className="d-flex align-items-center justify-content-between"
              title="目的地所在地只能選擇一個"
              onClick={handleSetIsland}
            >
              {label}
              <span className="arrow-right material-symbols-outlined">
                arrow_right
              </span>
            </div>
            <div
              className={
                'counties-wrapper position-absolute\t' +
                (beingActive.island ? 'active' : '')
              }
              onMouseLeave={handleResetAcitve}
            >
              {islandItems}
            </div>
          </div>
        </>
      );

    default:
      return <div>請在props area內輸入相對應的case</div>;
  }
}
