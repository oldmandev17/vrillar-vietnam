import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  THEAD_DRIVERS,
  THEAD_DRIVER_DETAIL,
  THEAD_RACES,
  THEAD_RACE_DETAIL,
  THEAD_TEAMS,
  THEAD_TEAM_DETAIL,
} from "./arrList";

const TableHead = ({ children }: { children?: ReactNode }) => {
  const { category, categoryType } = useParams();
  const [thead, setThead] = useState<Array<string>>([]);

  useEffect(() => {
    let newThead: string[] = [];

    if (category === "races")
      newThead = categoryType === "all" ? THEAD_RACES : THEAD_RACE_DETAIL;
    else if (category === "drivers")
      newThead = categoryType === "all" ? THEAD_DRIVERS : THEAD_DRIVER_DETAIL;
    else if (category === "teams")
      newThead = categoryType === "all" ? THEAD_TEAMS : THEAD_TEAM_DETAIL;

    setThead(newThead);
  }, [category, categoryType]);

  return (
    <thead>
      <tr>
        {thead.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
