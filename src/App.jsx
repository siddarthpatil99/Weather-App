
import './App.css'
import { IoMdSunny, 
  IoMdRainy, 
  IoMdCloudy, 
  IoMdSnow, 
  IoMdThunderstorm, 
  IoMdSearch
} from 'react-icons/io';
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from "react-icons/im";
import { useEffect, useState } from 'react';
import axios from 'axios';

const APIkey = "e9a8c0ad87fb1bc052495c5bc73835f7";

function App() {
  
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleInput = (e) => {
    setInputValue(e.target.value);
  }
  // console.log(inoutValue);

  const handleSubmit = (e) => {
    // console.log(inputValue);
    if (inputValue !== '') {
      setLocation(inputValue)
    }

    // select input and clear input 
    const input = document.querySelector('input');
    if (input.value === '') {
      setAnimate(true)
      // after 500ms set animate to false 
      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }
    input.value = '';

    e.preventDefault();
  }

  useEffect(() => {
    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then(res => {
      // set the data after 1500ms
      setTimeout(() => {
        setData(res.data);
        setLoading(false)
      }, 1500)
    })
    .catch((err) => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location]);

  // error msg
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000)

    return () => clearTimeout(timer);
  }, [errorMsg])

  if (!data) {
    return (
      <div
        className="
            w-full h-screen bg-gradient-to-r from-cyan-500 
            to-blue-500 bg-center flex flex-col justify-center 
            items-center"
      >
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#1f7693]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  const date = new Date();

  return (
    <div
      className="
      w-full 
      h-screen 
      bg-gradient-to-r from-cyan-500 to-blue-500 
      flex flex-col
      items-center justify-center
      px-4 lg:px-0"
    >
      {errorMsg && <div 
          className="w-8/12 max-w-[90vw] lg:max-w-[450px] 
              bg-[#ff208c] text-white absolute top-2 
              lg:tp-10 p-4 capitalize rounded-md">{`${errorMsg.response.data.message}`}</div>}
      <form
        className={`
        ${animate ? "animate-bounce" : "animate-none"}
        h-16 bg-black/30 w-full max-w-[450px] 
        rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div
          className="
          h-full relative flex 
          items-center justify-between p-2"
        >
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none 
              placeholder:text-white text-white text-[15px] 
              font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] 
              w-20 h-12 rounded-full
              flex items-center justify-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div
        className="
        w-full max-w-[450px] bg-black/20 min-h-[584px]
        text-white backdrop-blur-[32px] rounded-[32px]
        py-12 px-6
      "
      >
        {loading ? (
          <div className="w-full h-full flex 
                justify-center items-center">
                  <ImSpinner8 className="text-white text-5xl 
                                animate-spin" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name  */}
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/* date  */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="flex items-center justify-center">
                {/* temp  */}
                <div
                  className="
                text-[144px]
                leading-none
                font-light"
                >
                  {parseInt(data.main.temp)}
                </div>
                {/* celsius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description  */}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon  */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon  */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon  */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon  */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
