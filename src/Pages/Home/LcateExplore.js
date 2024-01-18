import React, { useEffect, useState } from "react";
import { Vitri } from "../../Services/Vitri";
import { Link } from "react-router-dom";
import { Card } from "antd";

const LcateExplore = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    Vitri.get_vitri_phanTrang()
      .then((err) => setCities(err.data.content.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="bg-white z-[999]">
        <div className="container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((i, d) => (
              <Link key={i} to={`/roombycity/${i.tinhThanh}`}>
                <Card
                  hoverable
                  className="w-full flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-lg object-cover"
                      src={i.hinhAnh}
                      alt=""
                    />
                    <div>
                      <h2 className="font-bold">{i.tinhThanh}</h2>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LcateExplore;
