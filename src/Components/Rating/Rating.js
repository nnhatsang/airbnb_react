import { StarFilled } from "@ant-design/icons";
import React from "react";

const Rating = ({ commentRef, avgRate, countComment }) => {
  return (
    <span className="space-x-2 flex items-center justify-center">
      <StarFilled
        className="text-main"
      />
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
