export default function TripRecommend() {
  return (
    <>
      <div className="product-recommended collapsable-block">
        <div className="collapse-controll d-flex justify-content-between">
          <h3 className="box-title title-underline">你可能也喜歡</h3>
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
