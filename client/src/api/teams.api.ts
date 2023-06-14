import axios from "./axios";

const teamApi = {
  listFollowYear: (year: string) => {
    const url = `team/list?year=${year}`;
    return axios.get(url);
  },
  listDetailFollowYear: (year: string, id: string) => {
    const url = `team/detail/${year}/${id}`;
    return axios.get(url);
  },
};

export default teamApi;
