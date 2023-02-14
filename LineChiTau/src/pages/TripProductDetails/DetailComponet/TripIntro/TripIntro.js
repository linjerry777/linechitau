export default function TripIntro({ tripIntroduction }) {
  return (
    <>
      <div className="product-description collapsable-block">
        <div className="collapse-controll d-flex justify-content-between">
          <h3 className="box-title title-underline">活動介紹</h3>
          <button>
            <span className="material-symbols-outlined show-btn">
              change_history
            </span>
          </button>
        </div>
        <div className="intro">{tripIntroduction}</div>
      </div>
    </>
  );
}
