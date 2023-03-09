import "./App.css";
import { set, template } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon  } from '@fortawesome/free-solid-svg-icons'
import { faCloud  } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Example() {
    var x = document.getElementById("demo");
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }
    function showPosition({ coords: { longitude, latitude } }) {
      console.log(latitude, longitude)
    }
    navigator.geolocation.getCurrentPosition(showPosition)
    console.log(showPosition)
    return (
      <div></div>
      )
  }

function App() {
    return (
          <div>
            <Example />
          </div>
        );
  }
  
  



export default App;
