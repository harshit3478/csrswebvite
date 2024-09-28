// Path: src/utils/renderEmergencyDetails.tsx
import React from 'react';
import { PermIdentity, Badge, Email, Phone, ContactEmergency, PendingActions, Done, BadgeOutlined } from '@mui/icons-material';
import { Emergency } from '../context/EmergencyContext';



interface CaseData {
  landmark: string;
  status: string;
  createdOn: string;
  timeTaken: string | null;
  resolvedOn: string | null;
}
    
export const renderDescription = (description: string, sensitivity: string) => (
  <div className="description bg-slate-50 p-5 shadow-sm shadow-slate-300 rounded-sm wrapper w-full">
    <p className="text-xl font-semibold capitalize p-1">More about case</p>
    <div className="flex justify-start items-center gap-4">
      <p className="font-semibold text-lg">Sensitivity :</p>
      <p className="text-lg font-light py-2 m-1">{sensitivity}</p>
    </div>
    <div className="flex justify-start items-start gap-4 my-2">
      <p className="font-semibold text-lg">Description:</p>
      <p className="text-lg font-light">{description}</p>
    </div>
  </div>
);

export const renderGoogleMapLink = (latitude: number, longitude: number) => (
  <div className="flex justify-start items-center flex-col gap-3 w-full m-2 p-1">
    <h2 className="text-lg font-semibold">Click to see location:</h2>
    <div className="flex justify-center">
      <a
        href={`https://maps.google.com/?q=${latitude},${longitude}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 font-semibold flex justify-center flex-col items-center"
      >
        <p>Open in Google Maps</p>
        <img src="/map.png" alt="Google Map" className="h-25 w-2/3 text-center" />
      </a>
    </div>
  </div>
);
