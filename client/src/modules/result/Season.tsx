import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RaceContext } from "~/context/RaceProvider";

const Season = () => {
  const navigate = useNavigate();

  const { setSelectedSeason, selectedSeason } = useContext(RaceContext);

  const handleSeasonClick = (e: any) => {
    const season = (e.target as HTMLElement).dataset.season;
    season && setSelectedSeason(season);
    navigate(`/result/${season}/races/all`);
  };

  return (
    <div className="wrapper__filter">
      <p className="wrapper__filter-heading">Season</p>
      <ul className="season">
        {Array.from({ length: 2023 - 1950 + 1 }).map((_, index) => {
          const year = 2023 - index;
          const active = year.toString() === selectedSeason ? "active" : "";
          return (
            <li
              key={year}
              className={`cursor-pointer ${active}`}
              data-season={year}
              onClick={handleSeasonClick}
            >
              {year}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Season;
