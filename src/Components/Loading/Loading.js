import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  return (
    <div
      className="fixed inset-0 bg-white   flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[200px] h-[200px]"
        viewBox="0 0 200 200"
      >
        <circle
          fill="#FE6B6E"
          stroke="#FE6B6E"
          stroke-width="11"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2.4"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
        <circle
          fill="#FE6B6E"
          stroke="#FE6B6E"
          stroke-width="11"
          opacity=".8"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2.4"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0.05"
          ></animate>
        </circle>
        <circle
          fill="#FE6B6E"
          stroke="#FE6B6E"
          stroke-width="11"
          opacity=".6"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2.4"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".1"
          ></animate>
        </circle>
        <circle
          fill="#FE6B6E"
          stroke="#FE6B6E"
          stroke-width="11"
          opacity=".4"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2.4"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".15"
          ></animate>
        </circle>
        <circle
          fill="#FE6B6E"
          stroke="#FE6B6E"
          stroke-width="11"
          opacity=".2"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2.4"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".2"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
