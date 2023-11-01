import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const CountryInfo = ({country}) => {
    console.log(country)
    const [weather, setWeather] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState("")
    
    const languages = []
    for (const key in country.languages) {
        if (!languages.includes(country.languages[key])){
            languages.push(country.languages[key])
        }
    }

    useEffect(() => {
        weatherService
            .getForecast(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then((response) => {
                console.log(response.data)
                setWeather(response.data)
            })
            .catch((error) => {
                console.log(error)
                setWeather(null) 
            })
    }, [])

    let weatherInfo = null
    if (weather){
        weatherInfo = (
        <div>
            <h2> Weather in {country.capital[0]} </h2>
            <span>Temperature: {weather.main.temp} Celcius</span>
            <br/>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <br/>
            <span>Wind: {weather.wind.speed} m/s</span>
            
        </div>)
    }

    return (
        <>
            <h2> {country.name.common} </h2>
            <div>
                <span> Capital: {country.capital[0]}</span>
                <br/>
                <span> Area: {country.area}</span>
            </div>
            <h3> Languages: </h3>
            {languages.map((lang) => {
                return (
                <div key={lang}>
                    <li>{lang}</li>
                </div>
                );
            })}
            <br/>
            <img src={country.flags.png} alt={country.flags.alt}/>
            {weatherInfo}
        </>
        
    )
}
    
export default CountryInfo