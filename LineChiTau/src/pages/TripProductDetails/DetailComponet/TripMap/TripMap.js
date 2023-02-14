export default function TripMap({ geoLocationX, geoLocationY }) {
  return (
    <>
      <div className="product-map collapsable-block">
        <div className="collapse-controll d-flex justify-content-between">
          <h3 className="box-title title-underline">地圖</h3>
          <a href="./">
            <span className="material-symbols-outlined show-btn">
              change_history
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
