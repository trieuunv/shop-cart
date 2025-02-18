import * as React from "react";
const Persional = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <circle cx={13} cy={8.667} r={3.833} stroke="#222" strokeLinecap="round" />
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M5.342 18.052c.706-2.325 3.114-3.427 5.545-3.427h4.226c2.43 0 4.84 1.102 5.545 3.427.19.628.343 1.324.417 2.074.055.55-.398.999-.95.999H5.875c-.552 0-1.005-.45-.95-.999.074-.75.227-1.446.417-2.074Z"
    />
  </svg>
);
export default Persional;