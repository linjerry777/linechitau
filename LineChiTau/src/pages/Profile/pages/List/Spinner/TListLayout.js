import React from 'react';
import ContentLoader from 'react-content-loader';

const TListLayout = (props) => (
  <ContentLoader
    speed={2}
    width={880}
    height={496}
    viewBox="0 0 880 496"
    title={'未登入'}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <circle cx="31" cy="31" r="15" /> */}
    {/* <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> */}
    {/* <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> */}
    <rect x="0" y="0" rx="2" ry="2" width="880" height="496" />
  </ContentLoader>
);

export default TListLayout;
