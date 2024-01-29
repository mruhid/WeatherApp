import { useState,useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [location, setLocation] = useState("")
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch("https://api.openweathermap.org/data/2.5/weather?q=baku&appid=5db5854d947c35de4a5e0f0f439945ab&units=metric")
    .then(response => response.json())
    .then(response=> {
      setData(response)
    })
    console.log("bbb")

    setTimeout(() => {
      setLooding(true)

    }, 1000);

  },[])
  const [input, setInput] = useState("")
  const [looding,setLooding]=useState(false)
  let [temp,setTemp]=useState("")
  

  const handleInput = (e) => {
    setLocation(e.target.value)
    setInput(e.target.value)
  }

  const curentTime=()=>{
    const currentTimeUTC = new Date();
    const offsetInSeconds = data.timezone;
      const currentTimeWithOffset = new Date(currentTimeUTC.getTime() + offsetInSeconds * 1000);

      // Format the time for display
      const options = { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        timeZone: 'UTC'
      };
      const formattedTime = currentTimeWithOffset.toLocaleTimeString('en-US', options);
      return formattedTime
  }
  const searchLocation = () => {
    console.log(location)
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=5db5854d947c35de4a5e0f0f439945ab&units=metric"
    fetch(url)
      .then(response => response.json())
      .then(a => {
        setData(a)

      })
      setTemp(data.main.temp)
      console.log(temp)
    setInput("")
  }

  const searcPlace=(loc)=>{
    
    setLocation(loc)
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=5db5854d947c35de4a5e0f0f439945ab&units=metric"
    fetch(url)
      .then(response => response.json())
      .then(a => {
        setData(a)

      })
    
  }
  return (
    <>
      {looding?<div className="weather__container">
        <div className='weather_information'>
          <div className='temprator'><h1>{Math.round(data.main.temp)}°C</h1></div>
          <div className='locations'>
            <div className='name'><h2>{data.name}</h2></div>
            <div className='curent_time'><h3>{curentTime()}</h3></div>
          </div>
          <div className='Overcast'>
            <h2>{data.weather[0].main}</h2>
            <h4>Humidity:{data.main.humidity}%</h4>
            <h4>Wind:{data.wind.speed}km/h</h4>
          </div>
        </div>


        <div className='countryes'>
          <div className="input">
            <input onChange={handleInput} value={input} className='search-input' type="text" name="" id="" placeholder='Enter Place.....' />
            <button onClick={searchLocation} className='search-button'>Search</button>
          </div>
          <div className="other_place">
            <ul>
              <li onClick={()=>searcPlace("italy")} className='li'>Italy</li>
              <li onClick={()=>searcPlace("argentina")} className='li'>Argentina</li>
              <li onClick={()=>searcPlace("china")} className='li'>China</li>
              <li onClick={()=>searcPlace("turkey")} className='li'>Turkey</li>
              <li onClick={()=>searcPlace("france")} className='li'>France</li>



            </ul>
          </div>
        </div>
      </div>:""}
    </>
  )
}

export default App
