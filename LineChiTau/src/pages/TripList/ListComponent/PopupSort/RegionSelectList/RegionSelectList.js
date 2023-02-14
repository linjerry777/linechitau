import '../../../../../css/global-style.scss';
import RegionBtn from '../RegionBtn/RegionBtn';
export default function RegionSelectList(props) {
  const [area, beingActive, handleResetAcitve, setNewRawKeyword] = props;

  const northernList = ['基隆', '宜蘭', '台北', '桃園', '新竹'];
  const centralList = ['苗栗', '台中', '彰化', '南投', '雲林'];
  const southernList = ['嘉義', '台南', '高雄', '屏東'];
  const easternList = ['台東', '花蓮'];
  const islandList = ['澎湖', '金門', '馬祖', '蘭嶼'];

  switch (area) {
    case 'northern':
      return (
        <>
          <div
            className={
              'counties-wrapper position-absolute\t' +
              (beingActive.northern ? 'active' : '')
            }
            onMouseLeave={handleResetAcitve}
          >
            {northernList.map((v, i) => (
              <RegionBtn region={v} setNewRawKeyword={setNewRawKeyword} />
            ))}
          </div>
        </>
      );
    case 'central':
      return (
        <>
          <div
            className={
              'counties-wrapper position-absolute\t' +
              (beingActive.central ? 'active' : '')
            }
            onMouseLeave={handleResetAcitve}
          >
            {centralList.map((v, i) => (
              <RegionBtn region={v} setNewRawKeyword={setNewRawKeyword} />
            ))}
          </div>
        </>
      );
    case 'southern':
      return (
        <>
          <div
            className={
              'counties-wrapper position-absolute\t' +
              (beingActive.southern ? 'active' : '')
            }
            onMouseLeave={handleResetAcitve}
          >
            {southernList.map((v, i) => (
              <RegionBtn region={v} setNewRawKeyword={setNewRawKeyword} />
            ))}
          </div>
        </>
          );
    case 'eastern':
      return (
        <>
          <div
            className={
              'counties-wrapper position-absolute\t' +
              (beingActive.eastern ? 'active' : '')
            }
            onMouseLeave={handleResetAcitve}
          >
            {easternList.map((v, i) => (
              <RegionBtn region={v} setNewRawKeyword={setNewRawKeyword} />
            ))}
          </div>
        </>
      );
    case 'island':
      return (
        <>
          <div
            className={
              'counties-wrapper position-absolute\t' +
              (beingActive.island ? 'active' : '')
            }
            onMouseLeave={handleResetAcitve}
          >
            {islandList.map((v, i) => (
              <RegionBtn region={v} setNewRawKeyword={setNewRawKeyword} />
            ))}
          </div>
        </>
      );
    default
  }
}
