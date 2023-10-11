import { useEffect, useState } from 'react';
import './weatherWidget.css'
import cloud from './cloud.jpeg'
import rain from './rain.png'
import brokenCloud from './broken cloud.png'
import overcast from './ocer.png'
import clearSky from './clearSky.png'
import scetaredClouds from './scateredClouds.png'
import snow from './snow.webp'
import smoke from './smokeee.png'




const WeatherCard = ({ weatherData }) => {
    const [data, setData] = useState()
    const [image, setImage] = useState()

    let date = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let ndate = date.toLocaleDateString('en-US', options);
    console.log(ndate);
    const WeatherForecast = () => {
        if (Math.round(weatherData.main.temp) <= "0") {
            setImage(snow)
        } else if (Math.round(weatherData.main.temp) <= "10") {
            setImage(rain)
        }
        else if (Math.round(weatherData.main.temp) <= "20") {
            setImage(overcast)
        }
        else if (Math.round(weatherData.main.temp) >= "20") {
            setImage(smoke)
        }
        else if (weatherData?.weather[0]?.description <= "30") {
            setImage(scetaredClouds)

        } else if (weatherData?.weather[0]?.description <= "40") {
            setImage(brokenCloud)
        } else {
            setImage(clearSky)
        }
    }

    useEffect(() => {
        setData(weatherData)
        WeatherForecast()
    }, [data])
    return (
        <div className="main-container">
            <div className="card">
                <div className="city-country">
                    {weatherData?.name},{weatherData?.sys?.country}
                </div>
                <div className="date">
                    {ndate}
                </div>
                <div className="temp">
                    {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="weather-img">
                    <img alt='weather' src={image} />
                </div>
                <div className="disp">
                    {weatherData?.weather[0]?.description}
                </div>
                <div className="humidity">
                    Humidity :  {weatherData?.main?.humidity}
                </div>
                <div className="wind">
                    Wind speed :  {weatherData?.wind?.speed}
                </div>
            </div>

        </div>
    )

}
export default WeatherCard;