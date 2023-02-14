import RadioSort from './RadioSort';
import ServiceSort from './ServiceSort';
export default function filterBox(props) {
  const {
    priceRange,
    setPriceRange,
    tripPriceArr,
    selectedServiceFilter,
    setSelectedServiceFilter,
    tripServiceList,
  } = props;

  const handleChecked = (e) => {
    const value = e.target.value;
    if (!selectedServiceFilter.includes(value))
      return setSelectedServiceFilter([...selectedServiceFilter, value]);

    if (selectedServiceFilter.includes(value)) {
      const newSelectedServiceFilter = selectedServiceFilter.filter(
        (v) => v !== value
      );
      setSelectedServiceFilter(newSelectedServiceFilter);
    }
  };

  return (
    <>
      <div className="filter-container my-border-radius m-auto mt-3">
        <div className="filter-box px-5 py-3">
          <h5 className="filter-box-title nav-foot">價格</h5>
          {tripPriceArr.map((value, i) => (
            <RadioSort
              key={i}
              value={value}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          ))}
        </div>
        <div className="filter-box px-5 py-3">
          <h5 className="filter-box-title nav-foot">活動特色</h5>
          {tripServiceList.map((value, i) => (
            <ServiceSort
              key={i}
              value={value}
              selectedServiceFilter={selectedServiceFilter}
              handleChecked={handleChecked}
            />
          ))}
        </div>
      </div>
    </>
  );
}
