import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import raceApi from "~/api/races.api";

import { RaceContext } from "~/context/RaceProvider";
import classNames from "~/utils/classNames";

const TableBody = () => {
  const navigate = useNavigate();
  const { season, category, categoryTypeId } = useParams();
  const { describe, bodyContent, isOpen, setHeading } = useContext(RaceContext);

  const handleClickTableData = (item: any) => {
    if (category === "races") {
      !categoryTypeId &&
        navigate(
          `/result/${season}/${category}/${item.nationality
            .toLowerCase()
            .split(" ")
            .join("-")}/${item.id}`
        );
    } else if (category === "drivers") {
      if (categoryTypeId) {
        navigate(
          `/result/${season}/races/${item.nationality
            .toLowerCase()
            .split(" ")
            .join("-")}/${item.id}`
        );
        season &&
          raceApi.listDetailFollowYear(season, item.id).then((result) => {
            const { name, date, description } = result.data.races;
            setHeading({
              name: name,
              description: description,
              date: date,
            });
          });
      } else
        navigate(
          `/result/${season}/${category}/${item.name
            .toLowerCase()
            .split(" ")
            .join("-")}/${item._id}`
        );
    } else if (category === "teams") {
      if (!categoryTypeId) {
        navigate(
          `/result/${season}/${category}/${item.name
            .toLowerCase()
            .split(" ")
            .join("-")}/${item._id}`
        );
      } else {
        navigate(
          `/result/${season}/races/${item.nationality
            .toLowerCase()
            .split(" ")
            .join("-")}/${item.id}`
        );
        season &&
          raceApi.listDetailFollowYear(season, item.id).then((result) => {
            const { name, date, description } = result.data.races;
            setHeading({
              name: name,
              description: description,
              date: date,
            });
          });
      }
    }
  };

  return (
    <tbody>
      {!isOpen &&
        bodyContent.map((item: any, index: number) => (
          <tr
            key={index}
            className={
              classNames(
                category === "races" && categoryTypeId
                  ? "cursor-default select-none pointer-events-none"
                  : "cursor-pointer"
              )
              // categoryType === "all"
              //   ? "cursor-pointer"
              //   : "cursor-default select-none pointer-events-none"
            }
            onClick={() => handleClickTableData(item)}
          >
            {describe.map((propertyName: any, index: number) => (
              <td key={index}>{item[propertyName]}</td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
