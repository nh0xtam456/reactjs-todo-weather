import "./App.css";
import { random, set, template } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
  import React, { useState, useEffect } from "react";
import axios from "axios";

const CitiesResult = ({
  id,
  name,
  code,
  icon,
  detail,
  lat,
  lon,
  day,
  min_temp,
  max_temp,
  detailday
}) => {
  return (
    <div className="total-index-inside">
      <div className="index-inside">
        <h4 className="header-index-inside">
          {name}
          <img className="code" src={code}></img>
        </h4>
        <h2 className="day">{day}</h2>
        <br />
        <h5 className="detailday">{detailday}</h5>
        <h3 className="temp-index-inside">
          <span className="Temp">{min_temp}-{max_temp}</span>
          <span className="Cel">℃</span>
        </h3>
        <br />
        <img src={icon} className="icon" ></img>
        <br />
        <p>{detail}</p>
        <p>Lat:{lat}</p>
        <p>Lon:{lon}</p>
      </div>
      <div className="afterSearch"></div>
    </div>
  );
};

const initCities = [
  {
    id:null,
    name: "Paris",
    code: "FR",
    temp: "9",
    icon: null,
    detail: "LIGHT",
    lat: null,
    lon: null,
    day:null,
    min_temp:null,
    max_temp:null
  },

  // {
  //   name: "Melbourne",
  //   code: "AU",
  //   temp: "15",
  //   icon: faCloud,
  //   detail: "Clear Sky",
  // },
  // { name: "Madrid", code: "ES", temp: "9", icon: faMoon, detail: "LIGHT" },
];



const Search = ({ inputCity, searchStart, setaddinputCity }) => {
  return ( 
    <div className="Searchcomp">
      <input
        className="searcharea"
        type="text"
        placeholder="Search for a city"
        value={inputCity}
        onChange={(e) => {setaddinputCity(e.target.value)}} 
        onKeyDown={(e) => searchStart(e.target.value,e)}
            />
      <button
        className="buttonne"
        type="submit"
        onClick={(e) => searchStart(inputCity)}
        
      >
        SUBMIT
      </button>
    </div>
  );
};

const Result = ({ cities}) => {
  const rows = [];
  cities.map((city) => {
    rows.push(
      <CitiesResult
        key={city.id}
        name={city.name}
        code={city.code}
        temp={city.temp}
        icon={city.icon}
        detail={city.detail}
        lat={city.lat}
        lon={city.lon}
        min_temp={city.min_temp}
        max_temp={city.max_temp}
        day={city.day}
        detailday={city.detailday}
      />
    );
  });
  return <div className="index">{rows}</div>;
};

function App() {
  const [data, setData] = useState([]);
  const [inputCity, setaddinputCity] = useState("");
  const [cities, setCities] = useState(initCities);
  useEffect (() => {
    function showLocation(data) {
      const lat = data.coords.latitude;
      const long = data.coords.longitude;
      const urlforcast = `${process.env.REACT_APP_WEATHER_4DAY}lat=${lat}&lon=${long}&units=metric&appid=646fe626c90ecd6bfe6faef6f4fac42c`;
      axios.get(urlforcast).then((res) => {
        const cities2 = []
        let data=res.data.list
        const data_show = data.filter((item) => {
          return item.dt_txt.includes('03:00:00')
        })
         data_show.map((item) => {
          const day = new Date(item.dt_txt);
          let getday= day.getDay()+1
          if(getday=="0")
          {
            getday="7"
          }
          if(getday=="1")
          {
            getday="Chủ nhật"
          }
          else
          {
            getday="Thứ "+getday
          }
          const iconne= item.weather[0].icon
          const iconnehtml = `http://openweathermap.org/img/wn/${iconne}@2x.png`
          const countryflag = (res.data.city.country)
          const lowflag = countryflag.toLowerCase()
          const iconflag = `http://openweathermap.org/images/flags/${lowflag}.png`
          const city ={
          detailday:(item.dt_txt),
          detail:item.weather[0].description,
          lat:res.data.city.coord.lat,
          lon:res.data.city.coord.lon,
          min_temp:parseInt(item.main.temp_min),
          max_temp:parseInt(item.main.temp_max),
          day:getday,
          icon:iconnehtml,
          name:res.data.city.name,
          code:iconflag,
          id:item.dt
          }
          cities2.push(city)
        })
          // const output=data_show.map((item) => {
          //   axi.
          // })
          // axi.min_temp=parseInt(res.data.list[a].main.temp_min)-273;
          // axi.max_temp = parseInt(res.data.list[a].main.temp_max)-273;
          // axi.day='Thứ ' + dayne2
          // axi.name = res.data.city.name;
          // axi.detail = res.data.list[a].weather[a].description;
          // axi.code = res.data.city.country
          // axi.icon = faMoon;
          // axi.lat = res.data.city.coord.lat
          // axi.lon = res.data.city.coord.lon;
          
          setaddinputCity("");
          setCities(cities2);
        

      });

      // axiosne2.forEach(cityax => {
      //   cityax.name=axiosne.data.name
      //   cityax.temp=axiosne.data.main.temp
      //   cityax.detail=axiosne.data.weather.description
      // })
    }
    navigator.geolocation.getCurrentPosition(showLocation);
  }, []);
  const searchStart = (text,key) => {
    if(key.key==='Enter')
    {
    //  inputCity = inputCity.replace(' ',"");
    function showLocation(data) {
      const name = text;
      const url = `${process.env.REACT_APP_WEATHER_API}?q=${name}&appid=${process.env.REACT_APP_API_KEY}`;
      // const urlforcast = `${process.env.REACT_APP_WEATHER_4DAY}lat=${lat}&lon=${long}&units=metric&appid=646fe626c90ecd6bfe6faef6f4fac42c`;
      axios.get(url).then((res) => {
        const lat = res.data.coord.lat
        const lon = res.data.coord.lon
        const urlforcast = `${process.env.REACT_APP_WEATHER_4DAY}lat=${lat}&lon=${lon}&units=metric&appid=646fe626c90ecd6bfe6faef6f4fac42c`;
        axios.get(urlforcast).then((res) => {
          const cities2 = []
        let data=res.data.list
        const data_show = data.filter((item) => {
          return item.dt_txt.includes('03:00:00')
        })
         data_show.map((item) => {
          const day = new Date(item.dt_txt);
          let getday= day.getDay()+1
          if(getday=="0")
          {
            getday="7"
          }
          if(getday=="1")
          {
            getday="Chủ nhật"
          }
          else
          {
            getday="Thứ "+getday
          }
          const iconne= item.weather[0].icon
          const iconnehtml = `http://openweathermap.org/img/wn/${iconne}@2x.png`
          const countryflag = (res.data.city.country)
          const lowflag = countryflag.toLowerCase()
          const iconflag = `http://openweathermap.org/images/flags/${lowflag}.png`

          console.log(item)
          const city ={
            detailday:(item.dt_txt),
          detail:item.weather[0].description,
          lat:res.data.city.coord.lat,
          lon:res.data.city.coord.lon,
          min_temp:parseInt(item.main.temp_min),
          max_temp:parseInt(item.main.temp_max),
          day:getday,
          icon:iconnehtml,
          name:res.data.city.name,
          code:iconflag,
          id:item.dt
          }
          cities2.push(city)
        })
          // const output=data_show.map((item) => {
          //   axi.
          // })
          // axi.min_temp=parseInt(res.data.list[a].main.temp_min)-273;
          // axi.max_temp = parseInt(res.data.list[a].main.temp_max)-273;
          // axi.day='Thứ ' + dayne2
          // axi.name = res.data.city.name;
          // axi.detail = res.data.list[a].weather[a].description;
          // axi.code = res.data.city.country
          // axi.icon = faMoon;
          // axi.lat = res.data.city.coord.lat
          // axi.lon = res.data.city.coord.lon;
          
          setaddinputCity("");
          setCities(cities2);
        

        })
        // let axiosne2 = [
        //   { name: null, code: null, temp: null, icon: faMoon, detail: null },
        // ];
        // axiosne2.forEach((axi) => {
        //   axi.name = res.data.name;
        //   axi.temp = parseInt(res.data.main.temp) ;
        //   axi.detail = res.data.weather[0].description;
        //   axi.code = res.data.name.slice(0, 2);
        //   axi.icon = faMoon;
        // });
        // setCities(axiosne2);
        // setaddinputCity("");
      });

      // axiosne2.forEach(cityax => {
      //   cityax.name=axiosne.data.name
      //   cityax.temp=axiosne.data.main.temp
      //   cityax.detail=axiosne.data.weather.description
      // })
    }
  
    navigator.geolocation.getCurrentPosition(showLocation);
  }
};
  return (
    <div className="Total">
      <h1>Simple Weather App</h1>
      <Search
        searchStart={searchStart}
        inputCity={inputCity}
        setaddinputCity={setaddinputCity}
      />
      <Result cities={cities} setCities={setCities} />
    </div>
  );
}

export default App;
