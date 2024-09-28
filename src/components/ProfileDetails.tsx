import React from "react";
import {
  PermIdentity,
  Badge,
  Email,
  Phone,
  ContactEmergency,
  PendingActions,
  Done,
  BadgeOutlined,
} from "@mui/icons-material";

const ProfileDetails = ({ user }) => {
  return (
    <div className="student-image-and-info flex gap-6 items-center p-3   ">
      <img src={user.imageUrl ?? "/photo.png"} width={300} alt="profile" className="w-[15%] rounded-lg " />
      <div className="w-[50%] min-w-fit  ">
        <p className="p-1.5 font-semibold ">
          <PermIdentity /> {user.username}
        </p>
        <p className="p-1.5 font-semibold ">
          <Badge /> {user.rollNo}
        </p>
        <p className=" m-1 font-semibold ">
          <Email /> {user.email}
        </p>
        <p className="p-1.5 font-semibold ">
          <Phone /> {user.phone}
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;
