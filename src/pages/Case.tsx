import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import { User } from "../context/EmergencyContext";
import ContactDetails, { Contact } from "../components/ContactDetails";
import ProfileDetails from "../components/ProfileDetails";
import {
  renderDescription,
  renderGoogleMapLink,
} from "../components/EmergencyTemplated";
import CaseDetails from "../components/CaseDetails";
import EmergencyModal from "../components/EmergencyModal";
import ResolveModal from "../components/ResolveModal";

interface CaseDetails {
  user: User;
  contacts: Contact[];
  email: string;
  location: {
    latitude: number;
    longitude: number;
    landmark: string | null;
  };
  status: string;
  createdOn: string;
  resolvedOn: string | null;
  timeTaken: string | null;
  description: string | null;
  sensitivity: string | null;
  respondedBy: string | null;
}

const Case: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResolveModal , setShowResolveModal] = useState(false);
  const [showUpdateModal , setShowUpdateModal] = useState(false);
  async function fetchCaseDetails(id: string | undefined) {
    if (!id) {
      setError("No case ID provided");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/emergency/v1/get/${id}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Case details:", data);
      setCaseDetails(data.data);
      console.log("Case details: in state", caseDetails);
    } catch (error) {
      console.log("Error fetching case details:", error);
      setError("Failed to fetch case details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCaseDetails(id);
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex gap-5">
          <Sidebar />
          <div className="flex-1 mx-auto">
            <div className="w-screen h-screen flex items-center justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!caseDetails) {
    return <div>No case details available</div>;
  }

  return (
    <>
    <div className="flex gap-5">
      <Sidebar />
      <div className="flex-1 mx-auto">
        <h1 className="text-3xl font-bold text-center">Case Details</h1>

        <div className="case-details my-6">
          <div className="flex w-full justify-around  ">
            <ProfileDetails user={caseDetails.user ?? {}} />
            <ContactDetails contacts={caseDetails.contacts ?? []} />
            <CaseDetails
              caseData={{
                landmark: caseDetails.location.landmark!,
                status: caseDetails.status,
                createdOn: caseDetails.createdOn,
                timeTaken: caseDetails.timeTaken!,
                resolvedOn: caseDetails.resolvedOn!,
              }}
              type="case"
              />
          </div>
          {renderDescription(
            caseDetails.description ?? "",
            caseDetails.sensitivity ?? ""
          )}
          {renderGoogleMapLink(
            caseDetails.location.latitude,
            caseDetails.location.longitude
          )}
          <div className="text-center">
            {/* <button className="btn bg-slate-300" onClick={() => navigate('/')}>Home</button> */}
          {caseDetails.status === "Pending" && <button onClick={()=> setShowResolveModal(true)} className="btn btn-success bg-red-700 text-white">Resolve</button>}
          </div>
        </div>
      </div>
    </div>
    {showResolveModal && <ResolveModal setShowModal={setShowResolveModal} id={id} />}
          </>
  );
};

export default Case;
