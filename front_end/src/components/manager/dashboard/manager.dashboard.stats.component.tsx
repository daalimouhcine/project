import axios from "@/api/axios";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function ManagerDashboardStatsComponent() {
  const [nomberE, setNomberE] = useState();
  const [nbrSurSite, setNbrSurSite] = useState();
  const [user] = useLocalStorage<any>("data");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/collab/" + user.user.equipe_id)
      .then((res) => {
        setNomberE(res.data.collab);
        setNbrSurSite(res.data.present);
      });
  }, []);
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2  py-4 sm:pl-0 pl-4 gap-4'>
        <div className='bg-[#0793DB] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#0793DB] text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-user-tie text-[#0793DB] text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{nbrSurSite}</p>
            <p>Sur site</p>
          </div>
        </div>
        <div className='bg-[#0793DB] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#0793DB] text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-house-user text-[#0793DB] text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{nomberE}</p>
            <p>A distance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
