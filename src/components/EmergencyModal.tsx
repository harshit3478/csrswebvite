import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import CaseDetails from "./CaseDetails";
import { renderGoogleMapLink } from "./EmergencyTemplated";
import { socket } from "../utils/socket";

const EmergencyModal = ({ data, setIsModal }) => {
  const navigate = useNavigate();
  console.log("data is emergency modal", data);
  async function handleRespond(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log("responding to alert");
    setIsModal(false);
    socket.emit("respond-to-alert",  data.user.deviceToken )
    navigate(`/alert/${data._id}`);
  }
  function handleClose(e) {
    e.preventDefault();
    setIsModal(false);
  }


  return (
    <>
      <dialog  id="my_modal_3" className="modal modal-open ">
        <div className="modal-box flex flex-row-reverse items-start min-w-max">
          <button className=" top-2 right-2" onClick={(e) => handleClose(e)}>
            X
          </button>
          <div className="modal-content flex flex-col justify-start gap-2 ">

            <h3 className="heading font-bold text-center text-3xl ">Emergency Alert</h3>
             <ProfileDetails user={data.user} />
             <CaseDetails caseData={{landmark: data.location.landmark.toString() , status : data.status , createdOn : data.createdOn }} type="alert" />
             {renderGoogleMapLink(data.location.latitude , data.location.longitude)}
            <div className="modal-buttons gap-3 text-center">
              <button className="btn btn-success" onClick={(e) => handleRespond(e)}>Respond</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EmergencyModal;
