const API_ID = import.meta.env.VITE_BASE_WEATHER_API_ID;

export const getWeatherData = async (userAddress) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userAddress},br&appid=${API_ID}&lang=pt_br&units=metric`
  );
  return res;
};
