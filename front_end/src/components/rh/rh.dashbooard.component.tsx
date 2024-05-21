import React, { useEffect, useState } from "react";
import axios from "axios";

import AddCollaborateurForm from "./add_collaborateur.form.component";
import AddEquipeForm from "./add_equipe.form.component";
import RhDashboardChartComponent from "@/components/rh/rh_chart.Collaborateur";

const RhDashboardComponent = () => {
  const [ajouter, setAjouter] = useState(false);

  const [numberCollaborateurs, setnumberCollaborateurs] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/collaborateurs`).then((res) => {
      setnumberCollaborateurs(res.data.numberCollaborateurs);
    });

    axios.get(`http://127.0.0.1:8000/api/managers`).then((res) => {
      setNumberManagers(res.data.numberManagers);
    });
  }, [ajouter]);

  const [numberManagers, setNumberManagers] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/reservations`).then((res) => {
      setNomberReservation(res.data.nomberReservation);
    });
  }, []);

  const [nomberReservation, setNomberReservation] = useState(0);

  const [equepes, setEquepes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/equipes").then((res) => {
      setEquepes(res.data.data);
    });
  }, []);

  const [selectEquipe, setSelectEquipe] = useState(0);
  const selectedEquip = (e: any) => {
    setSelectEquipe(e.target.value);
  };

  const [numberCollaborateusEquipe, setNumberCollaborateusEquipe] = useState(0);
  const [numberCollaborateusSite, setNumberCollaborateusSite] = useState(0);
  const [numberCollaborateusAdestance, setNumberCollaborateusAdestance] =
    useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/collab/" + selectEquipe)
      .then((res) => {
        setNumberCollaborateusEquipe(res.data.numberCollaborateusEquipe);
        setNumberCollaborateusSite(res.data.present);
        setNumberCollaborateusAdestance(res.data.collab);
      });
  }, [selectEquipe]);

  return (
    <div>
      <div className='flex flex-col lg:flex-row justify-between items-center p-5 bg-gray-100  h-40'>
        <p className='text-[35px] text-[#0793DB]'>Bienvenue!!!</p>
        <div className='flex gap-4'>
          <AddCollaborateurForm
            close={() => {
              setAjouter(!ajouter);
            }}
          />
          <AddEquipeForm
            close={() => {
              setAjouter(!ajouter);
            }}
          />
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <p className='p-2 text-green-500'>Select Equipe :</p>
        <form>
          <select
            onChange={selectedEquip}
            className='p-2 w-full outline-none border-none'>
            <option selected value='0'>
              All
            </option>
            {equepes?.map((equepe: any) => (
              <option key={equepe.id} value={equepe.id}>
                {equepe.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-4'>
        <div className='bg-[#0793DB]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-users text-blue-800 text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>
              {selectEquipe == 0
                ? numberCollaborateurs
                : numberCollaborateusEquipe}
            </p>
            <p>Collaborateurs</p>
          </div>
        </div>
        <div className='bg-[#0793DB]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-user-tie text-blue-800 text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{selectEquipe == 0 ? numberManagers : 1}</p>
            <p>Managers</p>
          </div>
        </div>
        <div className='bg-[#0793DB]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-user-tie text-blue-800 text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>
              {selectEquipe == 0 ? nomberReservation : numberCollaborateusSite}
            </p>
            <p>Sur site</p>
          </div>
        </div>
        <div className='bg-[#0793DB] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <i className='fas fa-house-user text-blue-800 text-[25px]'></i>
          </div>
          <div className='text-right'>
            <p className='text-2xl'>
              {selectEquipe == 0
                ? numberCollaborateurs! - nomberReservation!
                : numberCollaborateusAdestance}
            </p>
            <p>Adistance</p>
          </div>
        </div>
      </div>
      <RhDashboardChartComponent equipeSelect={selectEquipe} />
    </div>
  );
};
export default RhDashboardComponent;
