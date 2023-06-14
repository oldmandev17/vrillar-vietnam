import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "~/components/heading/Heading";
import Overlay from "~/components/overlay/Overlay";

import Table from "~/components/tables/Table";
import { RaceProvider } from "~/context/RaceProvider";
import Category from "~/modules/result/Category";
import CategoryType from "~/modules/result/CategoryType";
import Season from "~/modules/result/Season";

const Result = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <RaceProvider>
      <Overlay />
      <div className="container mx-auto pt-10">
        <div className="flex flex-col bg-white shadow-[0_2px_20px_rgba(0,0,0,.5)] p-10 mb-14">
          <div className="grid grid-cols-3">
            <Season />
            <Category />
            <CategoryType />
          </div>
          <hr className="my-10" />
          <Heading />
          <div>
            <Table />
          </div>
        </div>
      </div>
    </RaceProvider>
  );
};

export default Result;
