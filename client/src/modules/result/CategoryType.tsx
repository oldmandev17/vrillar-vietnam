import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import driverApi from "~/api/drivers.api";
import raceApi from "~/api/races.api";
import teamApi from "~/api/teams.api";
import { RaceContext } from "~/context/RaceProvider";

const CategoryType = () => {
  const navigate = useNavigate();
  const { category, season, categoryTypeId } = useParams();

  const [categoryTypeArr, setCategoryTypeArr] = useState<Array<any>>([]);

  const { setIsOpen } = useContext(RaceContext);

  const handleCategoryTypeClick = (e: any) => {
    const categoryDataValue = (e.target as HTMLElement).dataset.value,
      categoryId = (e.target as HTMLAnchorElement).dataset.id;

    if (categoryId) {
      navigate(
        `/result/${season}/${category}/${categoryDataValue
          ?.split(" ")
          .join("-")
          .toLowerCase()}/${categoryId}`
      );
    } else {
      navigate(
        `/result/${season}/${category}/${categoryDataValue
          ?.split(" ")
          .join("-")
          .toLowerCase()}`
      );
    }
  };

  useEffect(() => {
    setIsOpen(true);
    if (season) {
      setCategoryTypeArr([]);
      if (category === "races") {
        raceApi
          .listFollowYear(season)
          .then((result) => {
            const { races } = result.data;
            const updatedRaces = result.data.filteredCount
              ? [{ nationality: "ALL" }].concat(races)
              : races;
            setCategoryTypeArr(updatedRaces);
          })
          .finally(() => setIsOpen(false));
      } else if (category === "drivers") {
        driverApi
          .listFollowYear(season)
          .then((result) => {
            const { drivers } = result.data;
            const updatedDrivers = result.data.filteredCount
              ? [{ name: "ALL" }].concat(drivers)
              : drivers;
            setCategoryTypeArr(updatedDrivers);
          })
          .finally(() => setIsOpen(false));
      } else if (category === "teams") {
        teamApi
          .listFollowYear(season)
          .then((result) => {
            const { teams } = result.data;
            const updatedDrivers = result.data.filteredCount
              ? [{ name: "ALL" }].concat(teams)
              : teams;
            setCategoryTypeArr(updatedDrivers);
          })
          .finally(() => setIsOpen(false));
      }
    }
  }, [category, season, setIsOpen]);

  return (
    <div className="wrapper__filter">
      <p className="wrapper__filter-heading">Category Type</p>
      <ul className="category__type">
        {categoryTypeArr &&
          categoryTypeArr.map((item, index: number) => {
            let active = item._id === categoryTypeId;
            return (
              <li
                key={index}
                data-id={item._id}
                data-value={category === "races" ? item.nationality : item.name}
                className={`cursor-pointer ${active && "active"}`}
                onClick={handleCategoryTypeClick}
              >
                {category === "races" ? item.nationality : item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CategoryType;
