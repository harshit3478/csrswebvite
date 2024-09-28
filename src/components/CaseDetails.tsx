import React from 'react'
import { Done, PendingActions } from '@mui/icons-material'
import { timeStringToMinutes } from '../utils/timeUtils';
interface CaseData {
    landmark?: string ;
    status?: string;
    createdOn?: string;
    timeTaken?: string;
    resolvedOn?: string ;
  }

 interface CaseDetailsProps {
    caseData: CaseData;
    type: string;
    timer?: number;
  }
  
const CaseDetails = ({caseData , type , timer} : CaseDetailsProps) => {

    
  return (
    <div className="case-details">
    {type === 'alert' && timer && (
      <div className="timer p-2">
        <h2 style={{ color: "#FD0606", fontWeight: "bold" }}>
          <span style={{ fontSize: "70px" }}>
            {Math.floor(timer / 60).toString().padStart(2, '0')}:
            {Math.floor(timer % 60).toString().padStart(2, '0')}
          </span> Mins
        </h2>
        <p className="font-semibold text-xl">Time since alert taken</p>
      </div>
    )}
    <p className="m-1 p-2 font-semibold capitalize"><span className="text-slate-500">Near : </span>{caseData.landmark}</p>
    <p className={`m-1 p-2 font-bold capitalize ${caseData.status === "Resolved" ? "text-green-400" : "text-red-500"}`}>
      <span className="text-slate-500">Status : </span>
      {caseData.status === "Pending" ? <PendingActions /> : <Done />}
      {caseData.status}
    </p>
    <p className="m-1 p-2 font-semibold"><span className="text-slate-500">Happened On : </span>{caseData.createdOn}</p>
    {type !== 'alert' ?
    <>
    <p className="m-1 p-2 font-semibold"><span className="text-slate-500">Resolved On : </span>{caseData.resolvedOn}</p>
    <p className="m-1 p-2 font-semibold"><span className="text-slate-500">Time took to resolve : </span>{timeStringToMinutes(caseData.timeTaken!).toFixed(2)} mins</p>
    </>
    : null}
  </div>
  )
}

export default CaseDetails