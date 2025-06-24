export const getChangeColor = (num: number) => {
  if (num > 0) {
    return 'green';
  } else if (num < 0) {
    return 'red';
  } else {
    return 'black';
  }
};
