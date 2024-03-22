import { StarFilled } from "@ant-design/icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Moment from "react-moment";

const onImageError = (e) => {
  e.target.src = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
};
const ListComment = ({ item }) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div>
            <img
              alt=""
              className="w-12 h-12 rounded-full object-cover"
              src={item.avatar}
              onError={onImageError}
            />
          </div>
          <div>
            <p className="font-bold space-x-2">
              <span className="uppercase font-bold text-sm">
                {item.tenNguoiBinhLuan}
              </span>
              <span className="space-x-1">
                <span className="text-black font-bold">
                 
                  {Array.from({ length: item.saoBinhLuan }, (_, d) => (
                    <StarFilled
                      key={d}
                      className="text-main"
                      // style={{ color: value === "filled" ? "gold" : "gray" }}
                    />
                  ))}
                </span>
              </span>
            </p>
            <p className="text-gray-600">
              <small>
                <Moment fromNow>{item.ngayBinhLuan}</Moment>
              </small>
            </p>
          </div>
        </div>
        <div>
          <pre className="text-justify w-8/12 truncate">
            {item.noiDung.length > 0 ? item.noiDung : "Không nhận xét."}
          </pre>
        </div>
      </div>
    </>
  );
};

export default ListComment;
