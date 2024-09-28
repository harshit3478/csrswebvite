// Path: src/components/Sidebar.tsx
import React from "react";

import { LogoutOutlined } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

interface SidebarProps {
  color?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ color }) => {
  const { logout } = useLogout();

  return (
    <div
      className="sidebar max-w-fit px-3 h-screen sticky top-0 right-0 flex flex-col items-center justify-start gap-0"
      style={{ background: color ?? "#9FE2F7" }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        className="logo"
        width={200}
        height={200}
      />
      <ul className="upper-bar text-xl flex flex-col  justify-center">
        <li className="my-2  w-full hover:bg-sky-300 rounded-sm">
          <Link to="/" className="flex p-2 px-4">
            <img
              src="/dashboard.png"
              alt="Dashboard"
              className="icon mr-5"
              width={25}
              height={25}
            />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className=" my-2  w-full hover:bg-sky-300 rounded-sm">
          <Link to="/profile" className="flex p-2 px-4">
            <img
              src="/profile.png"
              alt="Profile"
              className="icon mr-5"
              width={25}
              height={25}
            />
            <span>Profile</span>
          </Link>
        </li>

        <li className=" my-2  w-full hover:bg-sky-300 rounded-sm">
          <Link to="/notifications" className="flex p-2 px-4">
            <img
              src="/notif.png"
              alt="Notifications"
              className="icon mr-5"
              width={25}
              height={25}
            />
            <span>Notifications</span>
          </Link>
        </li>
        <li className=" my-2  w-full hover:bg-sky-300 rounded-sm">
          <Link to="/settings" className="flex p-2 px-4">
            <img
              src="/settings.png"
              alt="Settings"
              className="icon mr-5"
              width={25}
              height={25}
            />
            <span>Settings</span>
          </Link>
        </li>

        <li className="my-2  w-full hover:bg-sky-300 rounded-sm">
          <button onClick={logout} className="flex p-2 px-4">
            <LogoutOutlined   className="icon mr-5" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
