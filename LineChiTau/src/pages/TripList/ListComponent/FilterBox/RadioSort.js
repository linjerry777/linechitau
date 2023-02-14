export default function RadioSort(props) {
  const { priceRange, setPriceRange, value } = props;

  return (
    <>
      <div className="form-check">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            value={value}
            checked={priceRange === value}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          />
          {value}
        </label>
      </div>
    </>
  );
}
