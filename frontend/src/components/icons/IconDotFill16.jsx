import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
  </svg>
);
export { SvgComponent as IconDotFill16 };
