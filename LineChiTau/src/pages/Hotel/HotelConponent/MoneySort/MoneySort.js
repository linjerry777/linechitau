import React from 'react';

function HotelServiceSort({
  roomPriceArray,
  setFilterCondition,
  filterCondition,
}) {
  return (
    <>
      {roomPriceArray.map((price, price_i) => {
        if (price.to === Number.MAX_SAFE_INTEGER) {
          price.to = '以上';
        }
        return (
          <div className="d-flex align-items-center my-3" key={price_i}>
            <input
              type="radio"
              name="price"
              className="me-3"
              data-priceto={
                typeof price.to === 'number'
                  ? price.to
                  : Number.MAX_SAFE_INTEGER
              }
              data-pricefrom={price.from}
              onChange={(e) => {
                const newFilterCondition = { ...filterCondition };
                // console.log(e.target);
                // console.log(e.target.priceto);
                newFilterCondition.priceTo = e.target.dataset.priceto;
                newFilterCondition.priceFrom = e.target.dataset.pricefrom;
                setFilterCondition(newFilterCondition);
              }}
            />
            <label for="price" className="me-3 my-p">
              {`${price.from} - ${price.to}`}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default HotelServiceSort;
