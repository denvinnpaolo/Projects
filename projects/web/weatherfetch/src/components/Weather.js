import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';

const Weather = () => {
    Geocode.setApiKey("AIzaSyCY4qx27h0FeRhO4XMUf-OpErdSZF3xuzM");

    const [location, setLocation] = useState({
        lat: null,
        lng:null,
        address: ''
    })

    useEffect(()=> {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(pos => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
                console.log(pos)
            })
        } else {
            console.log('hi')
        }
    }, [])

    const handleClick = () => {
        Geocode.fromAddress(location.address)
        .then(res => {
            setLocation({
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng
            })
            console.log(location)
        })
    }

    const handleChange = e => {
        setLocation({
            [e.target.name] : e.target.value 
        })
    }

    return(
        <div>
            <input
              name="address"
              onChange={handleChange}
              value = {location.address}
            />
            <button onClick={handleClick}></button>
            <div>{`latitude: ${location.lat}, longtitude: ${location.lng}`}</div>
        </div>

    )
}
export default Weather;