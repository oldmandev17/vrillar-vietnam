import axios from "./axios";

const raceApi = {
  list: () => {
    const url = "/race/list";
    return axios.get(url);
  },
  listFollowYear: (year: string) => {
    const url = `/race/list?year=${year}`;
    return axios.get(url);
  },
  listDetailFollowYear: (year: string, id: string) => {
    const url = `/race/detail/${year}/${id}`;
    return axios.get(url);
  },
};

export default raceApi;
