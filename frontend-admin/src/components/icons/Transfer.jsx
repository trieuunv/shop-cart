import * as React from "react";
const Transfer = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M0 0h26v26H0z" />
    <circle cx={17.333} cy={20.583} r={2.167} stroke="#222" strokeWidth={2} />
    <circle cx={9.75} cy={20.583} r={2.167} stroke="#222" strokeWidth={2} />
    <path
      stroke="#222"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.417 15.167h6.5V7.583m0 0V9.75H4.333v8.833a2 2 0 0 0 2 2h1.25m4.334-13h4.333l5.041 4.033a1 1 0 0 1 .376.781v1.686m-3.25-4.333h-1.084v4.333h4.334m0 0v4.5a2 2 0 0 1-2 2H19.5m-4.333 0h-3.25"
    />
  </svg>
);
export default Transfer;