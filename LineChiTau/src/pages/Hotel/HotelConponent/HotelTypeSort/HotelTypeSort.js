import './HotelTypeSort.scss';

export default function HotelTypeSort({
  hotelType,
  setFilterCondition,
  filterCondition,
}) {
  // console.log('type', filterCondition);
  return (
    <>
      {hotelType.map((hotelType, hotelType_i) => {
        return (
          <div className="ns-box d-flex align-items-center" key={hotelType_i}>
            <input
              type="radio"
              name="hotelType"
              id={hotelType === '全部' ? '1' : hotelType}
              className="me-3"
              onChange={(e) => {
                const newFilterCondition = { ...filterCondition };
                // console.log(e.target.id);
                newFilterCondition.type = e.target.id;
                setFilterCondition(newFilterCondition);
              }}
            />
            <label for="hotelType" className="me-3 my-p">
              {hotelType}
            </label>
          </div>
        );
      })}
    </>
  );
}
