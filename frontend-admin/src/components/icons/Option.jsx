// icon:menu_vertical | System UIcons https://systemuicons.com/ | Corey Ginnivan
import * as React from "react";

function Option(props) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="26px"
      width="26px"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
        <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
        <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
      </g>
    </svg>
  );
}

export default Option;
