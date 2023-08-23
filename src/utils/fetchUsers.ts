import axios from "axios";

export const fetchUsers = async (id: number, filter?: any) => {
  const baseUrl = "https://shikimori.me/api";
  try {
    const response = await axios.get(
      `${baseUrl}/users/${id}/anime_rates?status=completed&limit=5000`
    );
    return response.data
      ?.map((elem: any) => ({
        name: elem.anime.russian,
        url: `https://desu.shikimori.me${elem.anime.image.original}`,
        score: elem.score,
        id: elem.id,
        kind: elem.anime.kind,
      }))
      .filter((elem: any) => elem.kind === "tv");
  } catch (e) {
    console.log("Ошибка");
  }
};
