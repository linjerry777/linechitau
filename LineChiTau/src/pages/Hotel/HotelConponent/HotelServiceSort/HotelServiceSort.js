import React from 'react';

function HotelServiceSort({
  hotelServiceListArray,
  filterCondition,
  setFilterCondition,
}) {
  return (
    <>
      {hotelServiceListArray.map((hotelService, hotelService_i) => {
        return (
          <div className="ns-box d-flex my-2" key={hotelService_i}>
            <input
              type="checkbox"
              name={hotelService}
              id={hotelService}
              className="me-3"
              onChange={(e) => {
                let newFilterCondition = { ...filterCondition };
                if (e.target.checked) {
                  newFilterCondition.hotelService.push(e.target.id);
                } else {
                  newFilterCondition.hotelService =
                    newFilterCondition.hotelService.filter((v) => {
                      return v !== e.target.id;
                    });
                }

                setFilterCondition(newFilterCondition);
              }}
            />
            <label for={hotelService} className="me-3 my-p">
              {hotelService}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default HotelServiceSort;
