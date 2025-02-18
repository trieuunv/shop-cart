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
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m12 18-2-4-7-3.5a.55.55 0 0 1 0-1L21 3l-2.901 8.034m3.022 9.087a3 3 0 1 0-4.242 0c.418.419 1.125 1.045 2.121 1.879 1.051-.89 1.759-1.516 2.121-1.879zM19 18v.01" />
  </svg>
);
export { SvgComponent as IconLocationPin };
