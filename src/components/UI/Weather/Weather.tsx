import React, {useContext} from 'react';
import { ModalContext } from "../../../context/ModalContext";
import './styles.scss';
import ReactAnimatedWeather from 'react-animated-weather';
function Weather() {
    const {weather, temperature} = useContext(ModalContext);
    let iconState = 'CLEAR_DAY';
    const handleWeather = () => {
        if (weather['description'] === 'clear sky') {
            iconState = 'CLEAR_DAY';
        } else if (weather['description'] === 'few clouds') {
            iconState = 'PARTLY_CLOUDY_DAY';
        } else if (weather['description'] === 'scattered clouds') {
            iconState = 'CLOUDY';
        } else if (weather['description'] === 'broken clouds') {
            iconState = 'PARTLY_CLOUDY_DAY';
        } else if (weather['description'] === 'shower rain') {
            iconState = 'RAIN';
        } else if (weather['description'] === 'rain') {
            iconState = 'RAIN';
        }
        else if (weather['description'] === 'thunderstorm') {
            iconState = 'RAIN';
        }
        else if (weather['description'] === 'snow') {
            iconState = 'SNOW';
        }
        else if (weather['description'] === 'mist') {
            iconState = 'FOG';
        }
    };
    handleWeather()
    const defaults = {
        icon: iconState,
        color: 'goldenrod',
        size: 150,
        animate: true
    }
    return (
        <div className='weather'>
            <div className="weather-temperature">
                <h3>{`Temperature ${temperature['temp']}`}</h3>
            </div>
            <div className="weather-main">
                <ReactAnimatedWeather 
                    icon={defaults.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                />
            </div>
        </div>
    );
}

export default Weather;