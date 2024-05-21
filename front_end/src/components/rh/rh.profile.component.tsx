import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const RhProfileComponent = () => {
  const [user] = useLocalStorage<any>("data");
  const [rhProfil, setRhProfile] = useState<any>([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/rh/" + user.user.id).then((res) => {
      if (res.data.status === 200) {
        setRhProfile(res.data.results);
      }
    });
  }, []);
  return (
    <div className='w-full '>
      <div className='w-full relative mt-4 s rounded my-24 overflow-hidden'>
        <div className='top h-64 w-full bg-blue-600 overflow-hidden relative'>
          <img
            src='https://images.unsplash.com/photo-1503480207415-fdddcc21d5fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
            className='bg w-full h-full object-cover object-center absolute z-0'
          />
          <div className='flex flex-col justify-center items-center relative h-full  text-black'>
            {rhProfil.image === "default.png" ? (
              <span className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900/30 object-cover border-white border-4'>
                <span className='text-3xl font-medium leading-none text-white'>
                  {rhProfil.nom[0] + rhProfil.prenom[0]}
                </span>
              </span>
            ) : (
              <img
                src='@/common/image/{collaborateur.image}'
                alt='collaborateur'
              />
            )}
            <h1 className='text-2xl font-semibold'>
              {rhProfil.nom} {rhProfil.prenom}
            </h1>
            <h4 className='text-sm font-semibold'>RH</h4>
          </div>
        </div>
      </div>
      <>{/*  about section */}</>

      <div className='bg-white p-3 shadow-sm rounded-sm'>
        <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
          <span className='text-blue-500'>
            <svg
              className='h-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </span>
          <span className='tracking-wide'>Votre Profile</span>
        </div>
        <div className='text-gray-700'>
          <div className='grid md:grid-cols-2 text-sm'>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Votre nom</div>
              <div className='px-4 py-2'>{rhProfil.nom}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Votre prénom</div>
              <div className='px-4 py-2'>{rhProfil.prenom}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Telephone</div>
              <div className='px-4 py-2'>{rhProfil.phone}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Address</div>
              <div className='px-4 py-2'>{rhProfil.adresse}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Email.</div>
              <div className='px-4 py-2'>{rhProfil.email}</div>
            </div>
          </div>
        </div>
      </div>

      <>{/* End of about section : */}</>
    </div>
  );
};

export default RhProfileComponent;
