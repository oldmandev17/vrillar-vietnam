import axios from "./axios";

const driverApi = {
  listFollowYear: (year: string) => {
    const url = `/driver/list?year=${year}`;
    return axios.get(url);
  },
  listDetailFollowYear: (year: string, id: string) => {
    const url = `/driver/detail/${year}/${id}`;
    return axios.get(url);
  },
};

export default driverApi;
