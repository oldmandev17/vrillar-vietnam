import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import driverApi from "~/api/drivers.api";
import raceApi from "~/api/races.api";
import teamApi from "~/api/teams.api";

const describeRace = [
  "pos",
  "no",
  "name",
  "teamName",
  "laps",
  "time",
  "points",
];

const describeRaces = [
  "nationality",
  "date",
  "name",
  "teamName",
  "laps",
  "time",
];

const describeDrivers = ["pos", "name", "nationality", "teamName", "points"];
const describeDriver = [
  "nationality",
  "date",
  "teamName",
  "position",
  "points",
];

const describeTeams = ["pos", "name", "points"];
const describeTeam = ["nationality", "date", "points"];

interface RaceContextType {
  selectedCatgory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;

  selectedSeason: string | undefined;
  setSelectedSeason: React.Dispatch<React.SetStateAction<string | undefined>>;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;

  description: string | undefined;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;

  heading: any;
  setHeading: React.Dispatch<React.SetStateAction<any>>;

  bodyContent: any;
  setBodyContent: React.Dispatch<React.SetStateAction<Array<any>>>;

  describe: Array<string>;
}

export const RaceContext = createContext<RaceContextType>({
  selectedCatgory: "",
  setSelectedCategory: () => {},

  selectedSeason: "",
  setSelectedSeason: () => {},

  isOpen: false,
  setIsOpen: () => {},

  name: "",
  setName: () => {},

  description: "",
  setDescription: () => {},

  heading: {},
  setHeading: () => {},

  bodyContent: [],
  setBodyContent: () => {},

  describe: [],
});

export function RaceProvider({ children }: { children: React.ReactNode }) {
  const { season, category, categoryType, categoryTypeId } = useParams();

  const [selectedCatgory, setSelectedCategory] = useState<string | undefined>(
    category
  );

  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(
    season
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [heading, setHeading] = useState<any>({});
  const [bodyContent, setBodyContent] = useState<Array<any>>([]);
  const [describe, setDescribe] = useState<Array<string>>([]);

  useEffect(() => {
    setIsOpen(true);
    function getApiRace() {
      if (category === "races") {
        if (categoryTypeId === undefined) {
          season &&
            raceApi
              .listFollowYear(season)
              .then((result) => {
                const { races } = result.data;
                setBodyContent([]);
                races.map((item: any) => {
                  if (item.drivers && item.drivers.length > 0) {
                    const { date, drivers, nationality } = item;
                    const newItem = {
                      nationality,
                      date: date.slice(date.indexOf("-") + 2),
                      name: drivers[0].name,
                      teamName: drivers[0].teamName,
                      laps: drivers[0].laps,
                      time: drivers[0].time,
                      id: item._id,
                    };
                    return setBodyContent((prev) => [...prev, newItem]);
                  }
                  return null;
                });
              })
              .finally(() => setIsOpen(false));
          setDescribe(describeRaces);
        } else {
          season &&
            categoryTypeId &&
            raceApi
              .listDetailFollowYear(season, categoryTypeId)
              .then((result) => {
                const { drivers } = result.data.races;
                const newDriver = drivers.map((item: any, index: number) => ({
                  ...item,
                  pos: index + 1,
                }));
                setBodyContent(newDriver);
              })
              .finally(() => setIsOpen(false));
          setDescribe(describeRace);
        }
      }
    }

    function getApiDriver() {
      category === "drivers" && categoryTypeId === undefined
        ? season &&
          driverApi
            .listFollowYear(season)
            .then((result) => {
              const { drivers } = result.data;
              const newDrivers = drivers
                .sort((a: any, b: any) => b.points - a.points)
                .map((item: any, index: number) => ({
                  ...item,
                  pos: index + 1,
                }));
              setBodyContent(newDrivers);
            })
            .finally(() => setIsOpen(false))
        : season &&
          categoryTypeId &&
          driverApi
            .listDetailFollowYear(season, categoryTypeId)
            .then((result) => {
              const { races } = result.data;
              setBodyContent([]);
              races.map((item: any) => {
                if (item.race) {
                  const { points, position, race, teamName } = item;
                  const newItem = {
                    nationality: race.nationality,
                    date: race.date.slice(race.date.indexOf("-") + 2),
                    teamName,
                    position,
                    points,
                    id: race.id,
                  };
                  return setBodyContent((prev) => [...prev, newItem]);
                }
                return null;
              });
            })
            .finally(() => setIsOpen(false));

      !categoryTypeId
        ? setDescribe(describeDrivers)
        : setDescribe(describeDriver);
    }

    function getApiTeam() {
      setIsOpen(true);
      category === "teams" && categoryTypeId === undefined
        ? season &&
          teamApi
            .listFollowYear(season)
            .then((result) => {
              const { teams } = result.data;
              const newTeams = teams
                .sort((a: any, b: any) => b.points - a.points)
                .map((item: any, index: number) => ({
                  ...item,
                  pos: index + 1,
                }));
              setBodyContent(newTeams);
            })
            .finally(() => setIsOpen(false))
        : season &&
          categoryTypeId &&
          teamApi
            .listDetailFollowYear(season, categoryTypeId)
            .then((result) => {
              setBodyContent([]);
              const { races } = result.data;
              races
                .sort((a: any, b: any) => b.points - a.points)
                .map((item: any) => {
                  if (item.race) {
                    const { date, points, race } = item;
                    const newItem = {
                      nationality: race.nationality,
                      date: date.slice(date.indexOf("-") + 2),
                      points,
                      id: race.id,
                    };
                    return setBodyContent((prev) => [...prev, newItem]);
                  }
                  return null;
                });
            })
            .finally(() => setIsOpen(false));

      !categoryTypeId ? setDescribe(describeTeams) : setDescribe(describeTeam);
    }

    function getHeading() {
      if (category === "races") {
        !categoryTypeId
          ? setHeading({ name: `${season} Race Results` })
          : season &&
            raceApi
              .listDetailFollowYear(season, categoryTypeId)
              .then((result) => {
                const { date, name, description } = result.data.races;
                setHeading({
                  name,
                  date,
                  description,
                });
              });
      } else if (category === "drivers") {
        !categoryType
          ? setHeading({ name: `${season} Driver Standings` })
          : setHeading({
              name: `${season} Driver Standings: ${categoryType
                .split("-")
                .join(" ")
                .toUpperCase()}`,
            });
      } else
        !categoryType
          ? setHeading({ name: `${season} Constructor Standings` })
          : setHeading({
              name: `${season} Constructor Standings: ${categoryType
                .split("-")
                .join(" ")
                .toUpperCase()}`,
            });
    }

    if (category === "races") getApiRace();
    else if (category === "drivers") getApiDriver();
    else getApiTeam();

    getHeading();
  }, [category, categoryType, categoryTypeId, season]);

  return (
    <RaceContext.Provider
      value={{
        selectedCatgory,
        setSelectedCategory,
        selectedSeason,
        setSelectedSeason,
        isOpen,
        setIsOpen,
        name,
        setName,
        description,
        setDescription,
        heading,
        setHeading,
        bodyContent,
        setBodyContent,
        describe,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
}
