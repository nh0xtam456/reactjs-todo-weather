import "./App.css";
import { useEffect, useState } from "react";
import { set } from "lodash";


function App() {
   let hour=0
   let min=0
   let sec=0
   let time
   let i=0
   let a = setInterval(() => {
    sec+=59
    time=`${hour}:${min}:${sec}`
    console.log(time)
    if(sec>60)
    {
        min=min+1
        clearInterval(a)
        let b = setInterval
        if(min>60)
        {
            hour+=1
            clearInterval(a)
        }
    }
   },1000)
}

export default App;
