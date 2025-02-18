import * as React from "react";
const UserProfile = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <circle cx={20} cy={16.667} r={5} stroke="#222" strokeLinecap="round" />
    <circle cx={20} cy={20} r={15} stroke="#222" />
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M30 31.177c-.59-1.772-1.89-3.338-3.698-4.455S22.28 25 20 25s-4.494.605-6.302 1.722S10.59 29.405 10 31.176"
    />
  </svg>
);
export default UserProfile;