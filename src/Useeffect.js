import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Example() {
  
    useEffect(() => {
      function showLocation(data) {
        const lat = data.coords.latitude
        const long = data.coords.longitude
        const url = (`${process.env.REACT_APP_WEATHER_API}?lat=${lat}&lon=${long}&appid=646fe626c90ecd6bfe6faef6f4fac42c`)
        axios.get(url).then(data => console.log(data))
      }
      navigator.geolocation.getCurrentPosition(showLocation)
    },[] );
    const a = 'google.com'
      const b ='15'
      const c = '26'
      console.log(`Welcome ${a}  ${b}  ${c}`)
    return (
      <div>
      </div>
    );
  }

function App() {
    return (
          <div>
            <Example />
          </div>
        );
  }
  
  



export default App;
