import axios from "axios";

const baseUrl = "https://shikimori.me/api";

const getUserIdByName = async (name: string) => {
  const response = await axios.get(`${baseUrl}/users/${name}`);
  return {
    id: response.data.id,
    avatar: response.data.image.x160,
    userName: response.data.nickname,
  };
};

const getAnimeList = async (id: number, filters?: any) => {
  const response = await axios.get(`${baseUrl}/users/${id}/anime_rates`, {
    params: { limit: 5000, status: filters.list },
  });
  return response?.data
    ?.map((elem: any) => ({
      name: elem.anime.russian,
      url: `https://desu.shikimori.me${elem.anime.image.preview}`,
      score: elem.score,
      id: elem.id,
      kind: elem.anime.kind,
      categoryId: 8,
    }))
    .filter((el: any) => filters.type.includes(el.kind));
};

const getGenreOptions = async () => {
  const response = await axios.get(`${baseUrl}/genres`);
  return response.data;
};

export const services = {
  getAnimeList,
  getUserIdByName,
  getGenreOptions,
};
