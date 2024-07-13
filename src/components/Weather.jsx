import styles from './weather.module.css';
import search from '../assets/search.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import { useEffect, useState, useRef } from 'react';


const apiKey = process.env.VITE_APP_ID;
export default function Weather() {
    const [weatherData, setWeatherData] = useState(false)
    const inputRef = useRef()
    const searchCity = async (city) => {
        if (city === "") {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            const respose = await fetch(url);
            const data = await respose.json();

            if(!respose.ok){
                alert(data.message)
                return;
            }
            console.log(data);
            setWeatherData({
                humidityData: data.main.humidity,
                windspeedData: data.wind.speed,
                temperatureData: Math.floor(data.main.temp),
                locationData: data.name,
                iconData: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            })
        }
        catch (error) {
            setWeatherData(false)
            console.log("Error while fetching data")
        }
    }
    useEffect(() => { searchCity('Nepal') }, [])
    return (
        <div className={styles.weather}>
            <div className={styles.search}>
                <input ref={inputRef} type="text" placeholder='search' />
                <img src={search} alt="" onClick={() => { searchCity(inputRef.current.value) }} />
            </div>
            {/* If the Api is right the data will be shown */}
            {weatherData ? <>  <img src={weatherData.iconData} alt="" className={styles.weatherIcon} />
                <p className={styles.temperature}>{weatherData.temperatureData}°C</p>
                <p className={styles.location}>{weatherData.locationData}</p>
                <div className={styles.weatherData}>
                    <div className={styles.col}>
                        <img src={humidity} alt="" />
                        <div className={styles.humiditText}>
                            <p>{weatherData.humidityData}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <img src={wind} alt="" />
                        <div className={styles.windText}>
                            <p>{weatherData.windspeedData}km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div></> :
                // if the Api is wrong this fragment will run
                <></>}

        </div>
    )
}