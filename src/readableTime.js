const readableTime = seconds => {
  const readableMinutes = (seconds, suffix = "s") => {
    const minutes = Math.round(Math.abs(seconds) / 60);
    return `${minutes > 60 ? minutes % 60 : minutes} minute${
      minutes !== 1 ? suffix : ""
    }`;
  };

  const readableHours = (seconds, suffix = "s ") => {
    const hours = Math.floor(Math.abs(seconds) / 3600);
    return hours ? `${hours} hour${hours !== 1 ? suffix : " "}` : "";
  };

  return `${readableHours(seconds)}${readableMinutes(seconds)}`;
};

export default readableTime;