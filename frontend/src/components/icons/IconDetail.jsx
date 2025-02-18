import * as React from "react";

const SvgComponent = ({ width = "16", height = "16", fill = "currentColor", ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill={fill} 
        role="img" 
        viewBox="0 0 16 16" 
        width={width} 
        height={height} 
        {...props}
    >
        <path d="M10.4371 8.00153L4.96857 2.53295L6.02923 1.47229L12.0281 7.4712C12.1688 7.61185 12.2478 7.80262 12.2478 8.00153C12.2478 8.20044 12.1688 8.39121 12.0281 8.53186L6.02923 14.5308L4.96857 13.4701L10.4371 8.00153Z" />
    </svg>
);

export { SvgComponent as IconDetail };
