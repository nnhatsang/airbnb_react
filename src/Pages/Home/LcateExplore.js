import React, { useEffect, useState } from "react";
import { Vitri } from "../../Services/Vitri";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import convertToSlug from "../../Utils/convertToSlug";
const anywherePlaces = [
  {
    name: "Toàn bộ nhà",
    link_slug: "ho-chi-minh",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75",
  },
  {
    name: "Chỗ ở độc đáo",
    link_slug: "nha-trang",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75",
  },
  {
    name: "Trang trại và thiên nhiên",
    link_slug: "da-lat",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75",
  },
  {
    name: "Cho phép mang theo thú cưng",
    link_slug: "da-nang",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75",
  },
];
const explorePlaces = [
  {
    time: "15 phút",
    image:
      "https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp",
  },
  {
    time: "3 giờ",
    image:
      "https://res.cloudinary.com/rawn/image/upload/lbe3gpqkrwmzt98ce2nj.webp",
  },
  {
    time: "6.5 giờ",
    image:
      "https://res.cloudinary.com/rawn/image/upload/xi99sldgebhfvd3n66yx.webp",
  },
  {
    time: "15 phút",
    image:
      "https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp",
  },
  {
    time: "7.5 giờ",
    image:
      "https://res.cloudinary.com/rawn/image/upload/v1skk44cynr7gauhzb4e.webp",
  },
  {
    time: "45 phút",
    image:
      "https://res.cloudinary.com/rawn/image/upload/tqrm3cthowneesuafbp0.webp",
  },
  {
    time: "30 phút",
    image:
      "https://res.cloudinary.com/rawn/image/upload/tgt8dxlfwdh41jkptxeg.webp",
  },
  {
    time: "5 giờ",
    image:
      "https://res.cloudinary.com/rawn/image/upload/bt5jrxsl5ljq5bmfqqw0.webp",
  },
];
const LcateExplore = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  useEffect(() => {
    dispatch(setLoadingOn());
    Vitri.get_vitri_phanTrang()
      .then((err) => {
        setCities(err.data.content.data);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOff());
      });
  }, []);

  return (
    <>
      <div className=" mt-1 bg-white z-[999]">
        <div className="container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((i, d) => (
              <Link key={i} to={`/rooms/${convertToSlug(i.tinhThanh)}`}>
                <Card
                  hoverable
                  className="w-full flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-lg object-cover"
                      src={explorePlaces[d].image}
                      alt=""
                    />
                    <div>
                      <h2 className="font-bold">{i.tinhThanh}</h2>
                      <p className="text-gray-700 text-sm">
                        {explorePlaces[d].time} lái xe
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="space-y-3 pt-6 pb-16">
            <h1 className="font-bold text-3xl">Ở bất cứ đâu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
              {anywherePlaces.map((item, index) => {
                return (
                  <Link
                    data-aos="flip-left"
                    key={index}
                    to={`/rooms/${item.link_slug}`}
                  >
                    <Card
                      hoverable
                      className="w-full"
                      cover={<img alt="" src={item.url} />}
                    >
                      <Meta title={item.name} />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LcateExplore;
