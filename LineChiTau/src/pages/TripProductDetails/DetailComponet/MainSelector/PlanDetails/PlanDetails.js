import './PlanDetails.scss';

export default function PlanDetails({ content, notice }) {
  return (
    <>
      <div className="plan-details">
        <div className="details-wrapper d-flex flex-column">
          <div className="details-container my-heading d-flex align-content-center justify-content-between">
            方案詳情
            <span className="material-symbols-outlined show-btn">
              change_history
            </span>
          </div>
          <div className="collapse-details"></div>
          <div className="details-container my-heading d-flex align-content-center justify-content-between">
            訂購須知
            <span className="material-symbols-outlined show-btn">
              change_history
            </span>
          </div>
          <div className="collapse-details"></div>
        </div>
      </div>
    </>
  );
}
