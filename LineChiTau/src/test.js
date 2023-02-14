import { useState } from 'react';

function Test() {
  // [getter, setter]
  const [total, setTotal] = useState(0);

  return  (
    <>
      <h1
        onClick={() => {
          setTotal(total + 1)
        }}
      >
        {total}
        {""}
        {[]}
      </h1>
      {/* react的&&不代表且，此處代表如果&&左邊的表達式為真，則render右邊的東西 */}
      {/* 不能再&&左邊單純的擺上0,因為react會render數字0 */}
      {/* react不會render:null,空字串,空陣列,undefined */}
      {/* 用truthy/falsy判斷 */}
      {total && 123}
      {total !== 0 && <div>目前total: {total}</div>}
      {total > 0 && <div>目前total: {total}</div>}
      {/* 強制轉為布林值 */}
      {!!total && <div>目前total: {total}</div>}
    </>
  )
}

export default Test;
