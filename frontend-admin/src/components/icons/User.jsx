import * as React from "react";
const User = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <circle
      cx={13}
      cy={7.583}
      r={4.333}
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
    />
    <path
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M5.876 19.472c.727-2.778 3.48-4.305 6.35-4.305h1.548c2.871 0 5.623 1.527 6.35 4.305.189.722.34 1.493.412 2.28.05.55-.4.998-.953.998H6.417c-.553 0-1.004-.449-.953-.999.073-.786.223-1.557.412-2.28Z"
    />
  </svg>
);
export default User;