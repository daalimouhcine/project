import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./add_collaborateur.form.component.css";

import { dataCollaborateur } from "@/models";
import axios from "axios";

import Swal from "sweetalert2";

const ModifierManagerForm = ({ manager, chengManager }: any) => {
  const [selectedManager] = React.useState({
    nom: manager.nom,
    prenom: manager.prenom,
    phone: manager.phone,
    adresse: manager.adresse,
    equepe: manager.equepe,
  });

  const {
    register, // register the input
    handleSubmit, // <- needed to bind the form
    // watch, // to watch the value of a specific input
    formState: { errors }, // to get the form state
  } = useForm<dataCollaborateur>({ defaultValues: selectedManager });

  const [openForm, setOpenForm] = useState(false);

  const handleCloseForm = () => {
    // reset the form
    setOpenForm(!openForm);
  };

  const editManager = (data: any) => {
    const dataManger = {
      nom: data.nom,
      prenom: data.prenom,
      phone: data.phone,
      adresse: data.adresse,
      equepe: data.equepe,
    };
    axios
      .put(`http://127.0.0.1:8000/api/managers/` + manager.id, dataManger)
      .then((res) => {
        if (res.data.status === 200) {
          handleCloseForm();
          chengManager();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Manager a été modifier avec success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const [equepes, setEquepes] = useState([]);

  const getEquipes = () => {
    axios.get("http://127.0.0.1:8000/api/equipes").then((res) => {
      setEquepes(res.data.data);
    });
  };

  return (
    <div
      className={`flex align-middle justify-center bg-white rounded-md ${
        openForm && "openForm"
      }`}>
      <button
        onClick={() => {
          handleCloseForm();
          !openForm && getEquipes();
        }}
        type='button'
        id='label_button'
        // className='inline-flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-[#BA9672] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#a5805b] focus:outline-none focus:ring-2 focus:ring-[#BA9672] focus:ring-offset-2 sm:w-auto '
        className=''>
        <i className='fas fa-pen text-[#0793DB] hover:text-purple-500'></i>
      </button>
      <div className='modal_form'>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(editManager)}>
          <div className='user-box'>
            {/* <svg/> */}
            <input
              className='pl-2 w-full outline-none border-none'
              placeholder='Nom'
              type='text'
              {...register("nom", { required: "Le Nom est obligatoire" })}
            />
          </div>
          <p className='text-red-500'>{errors.nom?.message}</p>
          <div className='user-box'>
            {/* <svg/> */}
            <input
              className='pl-2 w-full outline-none border-none'
              placeholder='Prenom'
              type='text'
              {...register("prenom", { required: "Le prenom est obligatoire" })}
            />
          </div>
          <p className='text-red-500'>{errors.prenom?.message}</p>
          <div className='user-box'>
            {/* <svg/> */}
            <input
              className='pl-2 w-full outline-none border-none'
              placeholder='Telephone'
              type='text'
              {...register("phone", {
                required: "le telephone est obligatoire",
              })}
            />
          </div>
          <p className='text-red-500'>{errors.telephone?.message}</p>
          <div className='user-box'>
            {/* <svg/> */}
            <input
              className='pl-2 w-full outline-none border-none'
              placeholder="L'adresse"
              type='text'
              {...register("adresse", {
                required: "l'adresse est obligatoire",
              })}
            />
          </div>
          <p className='text-red-500'>{errors.adresse?.message}</p>
          <div className='user-box'>
            {/* <svg/> */}
            <select
              className='p-2 w-full outline-none border-none'
              {...register("equepe")}>
              {equepes?.map((equepe: any) => (
                <option key={equepe.id} value={equepe.id}>
                  {equepe.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type='submit'
            className='block w-full bg-[#0793DB] mt-4 py-2 rounded-md text-white font-semibold mb-2 cursor-pointer'
            value='Modifier'
          />
        </form>
      </div>
    </div>
  );
};

export default ModifierManagerForm;
