import {
  AccessTime,
  ArrowForwardIos,
  CardTravel,
  DateRangeOutlined,
  Done,
  EmailOutlined,
  HourglassEmpty,
  Numbers,
  PendingActions,
  PermIdentity,
  Person,
  PinDrop,
  SupervisedUserCircleSharp,
  VerifiedUser,
} from "@mui/icons-material";

import React from "react";
import { useNavigate } from "react-router-dom";

const EmergencyCard = ({
  _id,
  ImageUrl,
  Name,
  RollNo,
  Landmark,
  Status,
  Email,
  InitiatedAt,
  ResolvedAt,
  TimeTaken,
}) => {
  console.log("Emergency Card", _id);
  const navigate = useNavigate();
  const handleShowImage = () => {
    console.log("Image Clicked");
  };
  function handleClick(_id : string | undefined) {
    console.log("Clicked");
    navigate(`/case/${_id}`);
  }
  return (
    <>
      <div
        onClick={() => handleClick(_id)}
        className="bg-slate-100 cursor-pointer hover:bg-slate-300 rounded-lg p-3 flex h-min  justify-between border my-1.5 mx-1 border-black"
      >
        <div className="flex justify-around px-5 items-center w-full ">
          <div className="student-details flex items-center gap-6  justify-self-auto">
            <img src={ImageUrl} alt="profile" width={60} height={50} className=" bg-blue-300  origin-center aspect-square rounded-[50px]" />
            <div className="mx-2 max-w-80 ">
              <span className="text-md font-sans  m-1 p-2"><Person/>{Name}</span>
              <span className="text-md font-sans  m-1 p-2"><Numbers/>{RollNo}</span>
              <p className="text-md font-sans flex p-2">
                <EmailOutlined />{Email}
              </p>
            </div>
          </div>

          <div className="emergency-details  flex items-center gap-6  justify-self-auto">
            <div className="status text-md">
              <span
                className={` capitalize ${
                  Status === "Resolved" ? "text-green-400" : "text-red-500"
                }  font-bold -2 my-2 p-2`}
              >
                {Status === "Pending" ? <PendingActions /> : <Done />}
                {Status}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-sans  m-0.5">
                <PinDrop /> <strong>{Landmark}</strong>
              </span>
              {Status === "Resolved" ? (
                <span className="text-md font-sans  m-0.5">
                  <HourglassEmpty />
                  <strong>{TimeTaken} mins</strong>
                </span>
              ) : null}
            </div>
            <div className="flex flex-col">
              <span className="text-md font-sans  m-0.5">
                Initiated At: <strong> {InitiatedAt}</strong>
              </span>
              {Status === "Resolved" ? (
                <span className="text-md font-sans  m-0.5">
                  Resolved At: <strong>{ResolvedAt}</strong>
                </span>
              ) : null}
            </div>
          </div>
          <div className="button ">
          <button
            className="bg-slate-300 rounded-sm m-1 p-3"
            onClick={() => handleClick(_id)}
          >
            See More <ArrowForwardIos className="text-2xl" />
          </button>
        </div>
        </div>
        
      </div>
    </>
  );
};
export default EmergencyCard;
