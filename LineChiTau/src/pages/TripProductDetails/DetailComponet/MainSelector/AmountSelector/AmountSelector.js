import './AmountSelector.scss';
export default function AmountSelector({
  amountA,
  amountE,
  amountC,
  setAmountA,
  setAmountE,
  setAmountC,
}) {
  return (
    <>
      <div className="control-wrapper d-flex justify-content-center">
        成人票
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            setAmountA(amountA + 1);
          }}
        >
          add_circle
        </button>
        {amountA}
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            if (amountA > 0) {
              setAmountA(amountA - 1);
            }
          }}
        >
          do_not_disturb_on
        </button>
      </div>
      <div className="control-wrapper d-flex justify-content-center">
        敬老票
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            setAmountE(amountE + 1);
          }}
        >
          add_circle
        </button>
        {amountE}
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            if (amountE > 0) {
              setAmountE(amountE - 1);
            }
          }}
        >
          do_not_disturb_on
        </button>
      </div>
      <div className="control-wrapper d-flex justify-content-center">
        兒童票
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            setAmountC(amountC + 1);
          }}
        >
          add_circle
        </button>
        {amountC}
        <button
          className="material-symbols-outlined amountBtn"
          onClick={() => {
            if (amountC > 0) {
              setAmountC(amountC - 1);
            }
          }}
        >
          do_not_disturb_on
        </button>
      </div>
    </>
  );
}
