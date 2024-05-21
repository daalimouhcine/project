import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileSearch = () => {
  let { userId } = useParams();
  useEffect(() => {}, [userId]);

  const [searchProfil, setSearchProfile] = useState<any>([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/collaborateurs/" + userId)
      .then((res) => {
        if (res.data.status === 200) {
          setSearchProfile(res.data.results);
        }
      });
  }, []);

  const [statusCollaborateur, setStatusCollaborateur] = useState<any>([]);
  var today = new Date();
  const checkForExist = (id: any) => {
    return statusCollaborateur.some(
      (col: any) =>
        col.collaborateur_id === parseInt(id) &&
        col.date ==
          today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0")
    );
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/reservations`).then((res) => {
      setStatusCollaborateur(res.data.data);
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
            <img
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
              className='h-24 w-24 object-cover rounded-full'
              alt=''
            />
            <h1 className='text-2xl font-semibold'>
              {searchProfil.nom} {searchProfil.prenom}
            </h1>
            <h4 className='text-sm font-semibold'>Collaborateur</h4>
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
          <span className='tracking-wide'>
            Profile de collaborateur {searchProfil.nom}
          </span>
        </div>
        <div className='text-gray-700'>
          <div className='grid md:grid-cols-2 text-sm'>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>nom</div>
              <div className='px-4 py-2'>{searchProfil.nom}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>prénom</div>
              <div className='px-4 py-2'>{searchProfil.prenom}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Telephone</div>
              <div className='px-4 py-2'>{searchProfil.phone}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Address</div>
              <div className='px-4 py-2'>{searchProfil.adresse}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Email.</div>
              <div className='px-4 py-2'>{searchProfil.email}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Equipe</div>
              <div className='px-4 py-2'>{searchProfil.name}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Status Aujourd'hui</div>
              <div
                className={`px-4 py-2 ${
                  checkForExist(userId)
                    ? "bg-blue-100 text-blue-500 border-blue-500"
                    : "bg-yellow-100 text-yellow-500 border-yellow-500"
                }`}>
                {checkForExist(userId) ? "Sur Site" : "A distance"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>{/* End of about section : */}</>
    </div>
  );
};

export default ProfileSearch;
