import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const Topbar = () => {
  const {user} = useAuthContext();
  return (
    <div><div  className="flex justify-between items-center">
    <h2 className="font-semibold text-2xl ml-10">Dashboard</h2>
    <ul className='flex gap-5 items-center ' >
      <li>
        <Link  to="/notifications">
          <img src="/notif.png" alt="Notifications" width={50} className="icon" />
        </Link>   
      </li>
      <li className="flex gap-5  items-center mr-10">
        <p className="p-1 capitalize font-semibold">Welcome, {user?.name}</p>
        <Link   to="/profile">
          <img src='/kgp_logo.jpg' alt="Profile" className=" bg-blend-color-burn" width={50}  style={{margin:'0.5rem 0 '}}/>
        </Link>   
      </li>
    </ul>
  </div>
  <hr className="line font-bold h-0.5 w-full bg-black " /></div>
  )
}
export default Topbar;
// 