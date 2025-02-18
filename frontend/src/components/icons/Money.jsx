import * as React from "react";
const Money = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <rect width={19.5} height={13} x={3.25} y={6.5} stroke="#222" rx={2} />
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M5.417 9.75h3.25M17.333 16.25h3.25"
    />
    <circle cx={13} cy={13} r={2.167} stroke="#222" />
  </svg>
);
export default Money;