import axios from "./axiosConfig";

const SongAPI = {
  getAllSong() {
    const url = "http://localhost:4000/api/v1/song";

    return axios.get(url);
  },

  searchSong(name = "") {
    const url = `http://localhost:4000/api/v1/song?search=${name}`;
    return axios.get(url);
  },
  async createSong(name, description, image, video, genres, singers, releasedDate, producedBy, writtenBy, album) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("video", video);
    formData.append("name", name);
    formData.append("releasedDate", releasedDate);
    formData.append("producedBy", producedBy);
    formData.append("writtenBy", writtenBy);
    formData.append("genres", genres);
    formData.append("singers", singers);
    formData.append("description", description);
    formData.append("album", album);
    const res = await axios.post(
      `http://localhost:4000/api/v1/song`,
      formData
    );

    return res;
  },
};

export default SongAPI;
