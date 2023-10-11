import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import './home.css'
import WeatherCard from '../weatherWidget/weatherWidget';
import loading from './loading-removebg-preview.png'

const Home = () => {

    const [currentLocationonWeather, setCurrentLocationWeather] = useState()
    useEffect(() => {
        const controller = new AbortController();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (location) => {
                console.log(location);
                try {
                    let AP_KEY = "aac20320b6ea5375de1e3f6763abbadb"
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${AP_KEY}&units=metric`,
                        {
                            signal: controller.signal
                        }

                    )
                    console.log(response.data);
                    setCurrentLocationWeather(response.data)
                } catch (error) {
                    console.log(error.data);

                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }, [])

    const [weatherData, setWeatherData] = useState(null);

    const cityNameRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("submitHandler");
        let AP_KEY = "aac20320b6ea5375de1e3f6763abbadb"
        console.log("cityname : " + cityNameRef.current.value);
        try {


            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${AP_KEY}&units=metric`
            )
            console.log(response.data);
            setWeatherData(response.data)
        } catch (error) {
            console.log(error.data);
        }
    }
    return (
        <div className='card-container'>
            <form className='form' onSubmit={submitHandler}>
                <input
                    className='cityName'
                    id="cityNameInput"
                    type="text"
                    ref={cityNameRef}
                    required minLength={3}
                    maxLength={20}
                />
                <button className='btn' type="submit">Search</button>
            </form>
            {weatherData ? <WeatherCard weatherData={weatherData} /> : (<div>{(currentLocationonWeather) ? <WeatherCard weatherData={currentLocationonWeather} /> : <div className='isloading'><img src={loading} alt="loading" /></div>}</div>)} </div>
    )
}
export default Home;