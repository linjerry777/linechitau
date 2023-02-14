import './Pagination.scss';

export default function Pagination() {
  return (
    <>
      <div className="pagination-wrapper">
        <ul className="pagination-container list-unstyled d-flex">
          <li className="pagination-border px-2 my-p px-2 d-flex justify-content-center previous">
            <span class="material-symbols-outlined pagination-arrow">
              navigate_before
            </span>
          </li>
          <li className="pagination-border px-2 my-p px-2">
            <a href="/">1</a>
          </li>
          <li className="pagination-border px-2 my-p px-2">
            <a href="/">2</a>
          </li>
          <li className="pagination-border px-2 my-p px-2">
            <a href="/">3</a>
          </li>
          <li className="pagination-border px-2 my-p px-2 d-flex justify-content-center next">
            <span class="material-symbols-outlined pagination-arrow">
              navigate_next
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
