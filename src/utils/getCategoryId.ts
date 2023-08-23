export const getCategoryId = (score: number) => {
  switch (score) {
    case 10:
      return 0;
    case 9:
      return 1;
    case 8:
      return 2;
    case 7:
      return 3;
    case 6:
      return 4;
    case 5:
      return 5;
    case 4:
      return 6;
    case 3:
      return 6;
    case 2:
      return 7;
    case 1:
      return 7;
    default:
      return 8;
  }
};
