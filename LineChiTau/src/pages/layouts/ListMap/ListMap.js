import './ListMap.scss';

export default function ListMap({maxWidth,height}) {
     /* 在ProductList中 MW = 250, H = 200 */
      /* 在ProductDetail中 MW = 420 H =215 */
      const style = {
        maxWidth:`${maxWidth}px`,
        height:`${height}px`
      }
  return (
    <>
      <div className="list-map m-auto d-flex justify-content-center align-items-center" style={style}>
        <button className="map-view my-p">檢視地圖</button>
      </div>
    </>
  );
}
