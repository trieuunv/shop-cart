import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="8 8 8 8"
    {...props}
  >
    <path d="M10.74 10.75 12 8l1.25 2.75L16 12l-2.75 1.26L12 16l-1.26-2.74L8 12l2.74-1.25z" />
  </svg>
);
export { SvgComponent as IconStarFourPointsSmall };
