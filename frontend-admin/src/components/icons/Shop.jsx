import * as React from "react";
const Shop = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <path
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M8.667 13V8.667A4.333 4.333 0 0 1 13 4.333v0a4.333 4.333 0 0 1 4.333 4.334V13"
    />
    <path
      stroke="#33363F"
      strokeWidth={2}
      d="M4.028 13.418c.145-1.741.217-2.611.791-3.14s1.448-.528 3.195-.528h9.972c1.747 0 2.62 0 3.195.528s.646 1.399.791 3.14l.598 7.166c.084 1.014.126 1.52-.17 1.843-.298.323-.806.323-1.824.323H5.424c-1.017 0-1.526 0-1.823-.323s-.255-.83-.17-1.843z"
    />
  </svg>
);
export default Shop;