// Path: src/components/StickyHeadTable.tsx
import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import EmergencyCard from "./EmergencyCard";
import { Emergency } from "../context/EmergencyContext";
import { timeStringToMinutes } from "../utils/timeUtils";

interface StickyHeadTableProps {
  data: Emergency[];
}

export default function StickyHeadTable({ data }: StickyHeadTableProps) {
  const rowsPerPage = 5;
  const pageCount = data == null ? 0 : Math.ceil(data.length / rowsPerPage);
  const [page, setPage] = useState(0);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  console.log("data recieved in sticky head table is", data);
  const handleNextPage = () => {
    if (page < pageCount - 1) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <span className="m-0 p-2 text-xl font-bold text-black">Previous Cases</span>
      <div>
        { data === null ||  data.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl font-bold">No Data Found</h1>
          </div>
        ) : (
          data
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item) => (
              <div key={item._id}>
              <EmergencyCard
                _id={item._id}
                ImageUrl={item.user.imageUrl} 
                Name={item.user.username}
                RollNo={item.user.rollNo}
                Status={item.status}
                Landmark={item.location.landmark}
                Email={item.user.email}
                InitiatedAt={item.createdOn}
                ResolvedAt={item.resolvedOn}
                TimeTaken={timeStringToMinutes(item.timeTaken).toFixed(2)}
              />
              </div>
            ))
        )}
        <div className="mt-[20px] flex justify-center items-center">
          <button
            disabled={page === 0}
            onClick={handlePreviousPage}
            className="mr-2"
          >
            <ArrowBack />
          </button>
          <span className="mx-[10px]">
            Page {page + 1} of {pageCount}
          </span>
          <button
            disabled={page === pageCount - 1}
            onClick={handleNextPage}
            className="ml-2"
          >
            <ArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
