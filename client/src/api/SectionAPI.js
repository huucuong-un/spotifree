import axios from "./axiosConfig";

const SectionAPI = {
  getAllSection() {
    const url = "http://localhost:4000/api/v1/section";

    return axios.get(url);
  },
};

export default SectionAPI;
