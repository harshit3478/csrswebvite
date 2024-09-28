import React, { useEffect, useState } from "react";
import { useLoadEmergencies } from "../hooks/useLoadEmergencies";
import { useEmergencyContext } from "../hooks/useEmergencyContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import StickyHeadTable from "../components/List";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Emergency } from "../context/EmergencyContext";
import {
  getLast30DaysData,
  getHighCasesZone,
  getAverageTime,
} from "../utils/statsUtils";
import Loading from "../components/Loading";
import EmergencyModal from "../components/EmergencyModal";
import { socket } from "../utils/socket";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { loadEmergencies } = useLoadEmergencies();
  const navigate = useNavigate();
  const { emergencies } = useEmergencyContext();
   // show emergency modal when emergency is created
   const [emergencyModal, setEmergencyModal] = React.useState(false);
   const [emergency , setEmergency] = React.useState<any | null >(null);
   socket.connect()
   socket.on("emergency-created" , (data) =>{
     console.log("data received is :" , data);
      setEmergency(data)
     setEmergencyModal(true)
   })
 
  console.log(import.meta.env.VITE_APP_API_URL);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(true);
      loadEmergencies().finally(() => setLoading(false));
    }
  }, []);

  const last30DaysData = getLast30DaysData(emergencies || []);
  const highCasesZone = getHighCasesZone(last30DaysData);
  const avgTime = getAverageTime(last30DaysData);

  // console.log("emergencies are", emergencies, "and authstate is", user);
  if (loading)
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </>
    );
  return (
    <>
      {!loading && (
        <div className="main container flex">
          <Sidebar color="#9FE2F7" />
          <div className="flex-1 mx-auto">
            <Topbar />
            <div className="boxes flex gap-10 m-auto">
              <div
                className="shadow-sm shadow-slate-600 min-w-fit w-1/4 p-5 ml-10 my-4 mx-5 flex flex-col items-center"
                style={{ background: "#EFEAEA" }}
              >
                <div
                  className="number"
                  style={{
                    color: "red",
                    fontSize: "90px",
                    fontWeight: "bold",
                    paddingTop: "0px",
                  }}
                >
                  {last30DaysData.length}
                </div>
                <p className="box-text text-xl font-semibold">Total Cases</p>
                <p className="box-text text-xl font-semibold">
                  (in last 30 days)
                </p>
              </div>

              <div
                className="shadow-sm shadow-slate-600 w-1/4 p-5 my-4 mx-5 flex flex-col items-center justify-center"
                style={{ background: "#EFEAEA" }}
              >
                <div
                  className="capitalize p-2 m-1 text-center"
                  style={{
                    color: "red",
                    fontSize: "40px",
                    fontWeight: "bold",
                    paddingTop: "0px",
                  }}
                >
                  {highCasesZone || ""}
                </div>
                <p className="box-text text-xl font-semibold">
                  High Cases Zone
                </p>
              </div>
              <div
                className="shadow-sm shadow-slate-600 w-1/4 p-5 my-4 mx-5 flex flex-col items-center justify-center"
                style={{ background: "#EFEAEA" }}
              >
                <div className="number m-3">
                  <span
                    style={{
                      color: "red",
                      fontSize: "70px",
                      fontWeight: "bold",
                    }}
                  >
                    {avgTime.toFixed(2)}
                  </span>
                  <span style={{ color: "red", fontSize: "20px" }}>mins</span>
                </div>
                <p className="box-text text-xl font-semibold">
                  Avg. Time to solve
                </p>
              </div>
            </div>
            <StickyHeadTable data={emergencies!} />
          </div>
        </div>
      )}
      {emergencyModal && (

        <>
        <audio src="audio/alert.mp3" autoPlay  />
        <EmergencyModal data={emergency} setIsModal={setEmergencyModal} />
        </>
      )
      }
    </>
  );
};

export default HomePage;
