import axios from "axios";
const baseUrl = "https://api.openweathermap.org";

const api_key = import.meta.env.VITE_API_KEY
console.log(api_key)

const getForecast = (lat, lon) => {
    return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
};

export default { getForecast };
