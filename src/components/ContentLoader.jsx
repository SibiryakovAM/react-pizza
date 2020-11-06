import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#dcdcdc"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="27" y="19" rx="0" ry="0" width="0" height="1" />
    <circle cx="140" cy="140" r="140" />
    <rect x="0" y="290" rx="6" ry="6" width="315" height="30" />
    <rect x="0" y="327" rx="6" ry="6" width="280" height="84" />
    <rect x="0" y="415" rx="6" ry="6" width="83" height="76" />
    <rect x="131" y="415" rx="25" ry="25" width="141" height="34" />
  </ContentLoader>
);

export default MyLoader;
