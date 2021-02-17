import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import axios from 'axios';

const Weather = () => {
    Geocode.setApiKey("AIzaSyCY4qx27h0FeRhO4XMUf-OpErdSZF3xuzM");

    const [location, setLocation] = useState({
        lat: null,
        lng:null,
        address: '',
        weather: 0
    })

    useEffect(()=> {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(pos => {
                setLocation({...location,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
                console.log(pos)
            })
        } else {
            console.log('hi')
        }
    }, [])

    const handleClick = e => {
        e.preventDefault();
        Geocode.fromAddress(location.address)
        .then(res => {
            setLocation({...location,
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng
            })
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=14318e73194655c38ceca5222adc5301&units=imperial`)
            .then(data =>{ 
                console.log(data)
                setLocation({...location,
                    weather: Math.round(data.data.main.temp)
                })
            })
        })
    }

    const handleChange = e => {
        setLocation({...location,
            [e.target.name] : e.target.value 
        })
    }

    return(
        <div>
            <form>
                <input
                name="address"
                onChange={handleChange}
                value = {location.address}
                />
                <button type="submit" onClick={handleClick}>Get weather</button>
            </form>
            <div>{`latitude: ${location.lat}, longtitude: ${location.lng}, weather: ${location.weather}`}</div>
        </div>

    )
}
export default Weather;