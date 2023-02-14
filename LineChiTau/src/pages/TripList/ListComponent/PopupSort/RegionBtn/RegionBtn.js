import '../../../../../css/global-style.scss';
export default function RegionBtn({ region, setNewRawKeyword }) {
  return (
    <div
      className="d-flex justify-content-center keyword-select"
      onClick={setNewRawKeyword}
    >
      {region}
    </div>
  );
}
