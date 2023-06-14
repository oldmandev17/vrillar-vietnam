import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "~/components/Banner";
import Image from "~/components/images/Image";

const SEASON = [
  {
    src: "https://cdn-5.latimages.com/images/mgl/3QxxY/s4_2/open-uri20120928-26142-1hdzifw.jpg",
    alt: "1950",
    title: "1950",
  },
  {
    src: "https://www.borntoride.vn/wp-content/uploads/2019/09/lich-su-dau-an-gia-dua-f1.jpg",
    alt: "1951",
    title: "1951",
  },
  {
    src: "https://cdn-2.latimages.com/images/mgl/zp77L/s4/open-uri20120928-25829-1tnbpbq.jpg",
    alt: "1952",
    title: "1952",
  },
  {
    src: "https://motorsportmagazine.b-cdn.net/database/wp-content/uploads/sites/2/2020/12/1953-Grand-Prix-of-Albi-Fangio-and-Ascari-1600x900.jpg",
    alt: "1953",
    title: "1953",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJy5Ktw-UiXg5SR8AOFEVQfzk-dJJQQXLWPq637bYcXWId3s62h-8nbmx9rZ_Agw1OwTs&usqp=CAU",
    alt: "1954",
    title: "1954",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Fangio-MB-W196-3lMotor-1986.jpg",
    alt: "1955",
    title: "1955",
  },
  {
    src: "https://images.cdn.circlesix.co/image/1/700/0/uploads/posts/2016/04/be61d31115c8f5bcd830bcd96564510d.jpg",
    alt: "1956",
    title: "1956",
  },
  {
    src: "https://motorsportmagazine.b-cdn.net/database/wp-content/uploads/sites/2/2020/12/1957-German-Grand-Prix-Fangio-1600x900.jpg",
    alt: "1957",
    title: "1957",
  },
  {
    src: "http://en.espnf1.com/PICTURES/CMS/8400/8415.jpg",
    alt: "1958",
    title: "1958",
  },
];

const Season = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Banner />
      <div className="p-10 bg-gray-200">
        <div className="container mx-auto">
          <h1 className="font-bold text-5xl text-custom-gray text-center">
            Season
          </h1>
          <div className="mt-10">
            <div className="grid grid-cols-5 gap-x-5 gap-y-14">
              {SEASON.map((item: any) => (
                <Image.Season
                  key={item.src}
                  alt={item.alt}
                  src={item.src}
                  onClick={() => navigate(`/result/${item.title}/races/all`)}
                >
                  {item.title}
                </Image.Season>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Season;
