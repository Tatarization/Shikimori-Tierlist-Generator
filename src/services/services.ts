import axios from "axios";

const baseUrl = "https://shikimori.me/api";

const getUserIdByName = async (name: string) => {
  const response = await axios.get(`${baseUrl}/users/${name}`);
  return response.data.id;
};

const getAnimeList = async (id: number, filter?: any) => {
  const response = await axios.get(
    `${baseUrl}/users/${id}/anime_rates?status=completed&limit=5000`
  );
  return response?.data
    ?.map((elem: any) => ({
      name: elem.anime.russian,
      url: `https://desu.shikimori.me${elem.anime.image.original}`,
      score: elem.score,
      id: elem.id,
      kind: elem.anime.kind,
      categoryId: 8,
    }))
    .filter((elem: any) => elem.kind === "tv");
};

export const services = {
  getAnimeList,
  getUserIdByName,
};
