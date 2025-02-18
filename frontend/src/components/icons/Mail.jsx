import * as React from "react";
const Mail = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <rect width={17.333} height={13} x={4.333} y={6.5} stroke="#222" rx={2} />
    <path
      stroke="#222"
      d="m4.333 9.75 7.773 3.886a2 2 0 0 0 1.788 0l7.773-3.886"
    />
  </svg>
);
export default Mail;