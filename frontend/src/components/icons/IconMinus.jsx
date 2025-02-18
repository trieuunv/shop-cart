import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z" />
  </svg>
);
export { SvgComponent as IconIconMinus };
