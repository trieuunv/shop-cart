import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="-6 0 24 24"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export { SvgComponent as ChevronRight };
