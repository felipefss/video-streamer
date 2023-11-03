export const convertSecondsToMinutes = (time: number) => {
  const timeInt = Math.round(time);
  const minutes = Math.round(timeInt / 60);
  const seconds = timeInt % 60;

  return `${minutes}:${seconds}`;
};
