import axios from "./axiosConfig";

export const getAllPlaylists = async () => {
  const res = await axios.get(`http://localhost:4000/api/v1/playlist`);
  return res;
};
export const getPlaylist = async (id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/playlist/${id}`);
  return res;
};

export const createPlaylist = async (data) => {
  const res = await axios.post(`http://localhost:4000/api/v1/playlist/`, data);
  return res;
};

export const addSongToPlaylist = async ({ song, playlist }) => {
  const res = await axios.post(`http://localhost:4000/api/v1/playlist/songs`, {
    song,
    playlist,
  });
  return res;
};

export const addSongsToPlaylist = async ({album, playlist}) => {
  const res = await axios.post(`http://localhost:4000/api/v1/playlist/songs/multiple`, {
    album,
    playlist,
  });
  return res;
}
