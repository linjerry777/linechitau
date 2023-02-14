import './ServiceSort.scss';

export default function ServiceSort(props) {
  const { value, handleChecked, selectedServiceFilter } = props;

  return (
    <>
      <div className="ns-box d-flex align-items-center">
        <label className="me-3 my-p">
          <input
            type="checkbox"
            className="me-3"
            value={value}
            checked={selectedServiceFilter.includes(value)}
            onChange={handleChecked}
          />
          {value}
        </label>
      </div>
    </>
  );
}
