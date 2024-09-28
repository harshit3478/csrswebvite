import React, { useEffect, useState } from "react";

import BasicTable from "./List";
import { RefreshOutlined, RefreshRounded } from "@mui/icons-material";
import Topbar from "./Topbar";

function Main() {
  const [data, setData] = useState([]);
  const getEmergenciesData = () => {
    try {
      if (localStorage.getItem("emergenciesData")) {
        setData(JSON.parse(localStorage.getItem("emergenciesData")));
        console.log("data from localstorage", data);
      } else {
        fetch(`${import.meta.env.VITE_APP_API_URL}/emergency/v1/get`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data = data.data;
            setData(data);
            // store data in localstorage
            localStorage.setItem("emergenciesData", JSON.stringify(data));
          });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getEmergenciesData();
  }, []);
  function calculateAverageTime(data) {
    let sum = 0;
    data.forEach((item) => {
      if (
        item.timeTakenToResolve === null ||
        item.timeTakenToResolve === undefined ||
        item.timeTakenToResolve === ""
      ) {
      } else {
        console.log("item", item.timeTakenToResolve);
        const [hours, minutes, seconds] = item.timeTakenToResolve.split(":");
        const total_seconds =
          parseInt(hours) * 60 * 60 +
          parseInt(minutes) * 60 +
          parseInt(seconds);
        sum += total_seconds;
      }
    });
    return sum / data.length;
  }
  try {
    var avgTime = calculateAverageTime(data);
    //now convert it to hours, minutes and seconds
    const minutes = Math.floor(avgTime / 60);
    const seconds = Math.floor(avgTime % 60);
    avgTime = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    console.log("avgTime", avgTime);
  } catch (error) {
    console.log("error", error);
  }
  function getLast30DaysData(data) {
    const last30DaysData = data.filter((item) => {
      const date = new Date(item.createdOn);
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    });
    return last30DaysData;
  }
  const last30DaysData = getLast30DaysData(data);
  console.log("last30DaysData", last30DaysData);
  

  const highCasesZone = getHighCasesZone(data);
  console.log("highCasesZone", highCasesZone);

  return (
    <div className="w-full p-4 px-10 ">
      <Topbar />
    
      <div className="w-full  bg-white p-5 rounded-lg shadow-lg mt-5 mx-auto">
        <button
          onClick={() => {
            localStorage.removeItem("emergenciesData");
            window.location.reload();
          }}
          className="p-1 m-0.5 font-bold text-xl text-white bg-slate-600 rounded-sm hover:bg-slate-500"
        >
          {" "}
          <RefreshRounded /> Refresh Cases
        </button>
        <BasicTable className="w-full " />
      </div>
    </div>
  );
}

export default Main;
