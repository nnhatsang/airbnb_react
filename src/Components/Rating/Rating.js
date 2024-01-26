import React from "react";

const Rating = ({ commentRef, avgRate, countComment }) => {
  return (
    <span className="space-x-2 flex items-center justify-center">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="m9 12l2 2l4-4" />
          <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5zm17 12H2" />
        </g>
      </svg>
      <span className="text-black font-bold">{avgRate}</span>
      <span
        onClick={() =>
          commentRef.current.scrollIntoView({ behavior: "smooth" })
        }
        className="underline cursor-pointer text-gray-600 hover:text-main duration-300"
      >
        ({countComment}) đánh giá
      </span>
    </span>
  );
};

export default Rating;
