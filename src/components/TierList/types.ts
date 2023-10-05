export type UserInfo = {
  name: string;
  url: string;
  score: number;
  id: number;
  kind: string;
  categoryId: number;
  order: number;
};

export type Tier = {
  id: number;
  color: string;
  title: string;
  items: UserInfo[];
};

export type User = {
  userId: number;
  avatar: string;
  userName: string;
};
