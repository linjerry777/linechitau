export default function SortSelect(props) {
  const { sortBy, setSortBy } = props;

  //TODO 加上事件改變soryBy

  return (
    <>
      <ul className="top-sort-list list-unstyled my-p d-flex align-items-center ">
        <li className="top-sort-btn">排序：</li>
        <li className="top-sort-btn grades">
          價格
          <button className="my-btn">
            <span className="arrow material-symbols-outlined">
              keyboard_arrow_up
            </span>
          </button>
          <button className="my-btn">
            <span className="arrow material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
        </li>
        <li className="top-sort-btn price">
          評價
          <button className="my-btn">
            <span className="arrow material-symbols-outlined">
              keyboard_arrow_up
            </span>
          </button>
          <button className="my-btn">
            <span className="arrow material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
        </li>
      </ul>
    </>
  );
}
