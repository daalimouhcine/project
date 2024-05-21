import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./add_collaborateur.form.component.css";

import axios from "axios";

import Swal from "sweetalert2";
import React from "react";

interface EquipeName {
  nom_equipe: String;
  nb_places: Number;
  nom: string;
  prenom: string;
  adresse: string;
  phone: string;
}

const MAX_STEPS = 3;

const AddEquipeForm = (props: any) => {
  const [openEquipeForm, setOpenEquipeForm] = useState(false);

  const {
    register, // register the input
    handleSubmit, // <- needed to bind the form
    // watch, // to watch the value of a specific input
    reset, // to reset the form
    formState: { errors, isValid }, // to get the form state
  } = useForm<EquipeName>({ mode: "all" });

  const [formStep, setFormStep] = React.useState(0);

  const handleCloseForm = () => {
    // reset the form
    props.close();
    setOpenEquipeForm(!openEquipeForm);
    openEquipeForm && reset();
    openEquipeForm && setFormStep(0);
  };

  const handleStepCompletion = () => {
    isValid && setFormStep(formStep + 1);
  };
  useEffect(() => {}, [formStep]);

  const onSubmit = async (data: any) => {
    // add new equipe
    let newEquipe = {
      nom: data.nom_equipe,
      nb_places: data.nb_places,
    };
    // add new manager
    let newManager = {
      nom: data.nom,
      prenom: data.prenom,
      phone: data.phone,
      adresse: data.adresse,
    };
    axios.post(`http://127.0.0.1:8000/api/equipes`, newEquipe).then((res) => {
      if (res.data.status === 200) {
        axios
          .post(`http://127.0.0.1:8000/api/managers`, newManager)
          .then((resM) => {
            if (resM.data.message === "success") {
              Swal.fire({
                position: "center",
                icon: "success",
                title:
                  "Vous avez ajouter une équipe avec son manager avec success",
                showConfirmButton: false,
                timer: 1500,
              });
              handleCloseForm();
            } else if (res.data.status === 400) {
              alert("eroooooooooooor");
            }
          });
      } else if (res.data.status === 400) {
        alert("eroooooooooooor");
      }
    });
  };

  return (
    <div
      className={`flex align-middle justify-center  rounded-md ${
        openEquipeForm && "openForm"
      }`}>
      <button
        onClick={() => handleCloseForm()}
        type='button'
        id='label_button'
        className='relative inline-flex items-center justify-center p-4 px-10 py-2.5 mx-2 my-2 overflow-hidden font-medium text-[#0793DB] transition duration-300 ease-out border-2 border-[#0793DB] rounded-md shadow-md group'>
        <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#0793DB] group-hover:translate-x-0 ease'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
          </svg>
        </span>
        <span className='absolute flex items-center justify-center w-full h-full bg-[#0793DB]transition-all duration-300 transform group-hover:translate-x-full ease'>
          Ajouter une Equipe
        </span>
        <span className='relative invisible'>Ajouter une Equipe</span>
      </button>
      <div className='modal_form'>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}>
          {/* titles */}
          {formStep >= 0 && (
            <h2
              className={`font-semibold text-xl mb-8 text-center  ${
                formStep === 0 ? "block" : "hidden"
              }`}>
              Informations d'équipe
            </h2>
          )}
          {formStep >= 1 && (
            <h2
              className={`font-semibold text-xl mb-8 text-center  ${
                formStep === 1 ? "block" : "hidden"
              }`}>
              Informations de Manager
            </h2>
          )}
          {/* details */}
          {formStep <= 3 && (
            <div className='h-2 w-full bg-gray-200'>
              <div
                style={{ width: `${((formStep + 1) / MAX_STEPS) * 100}%` }}
                className='h-full bg-[#0793DB]'></div>
            </div>
          )}
          {formStep <= 3 && (
            <div
              className={`flex ${
                formStep === 0 ? "justify-end" : "justify-between"
              } items-center mb-6 font-medium text-sm`}>
              {formStep > 0 && (
                <button
                  onClick={() => setFormStep((cur) => cur - 1)}
                  className='flex items-center force_black force_m_0 hover:text-gray-500 focus:outline-none'
                  type='button'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-5 mr-1 inline'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  Précédent
                </button>
              )}
              <p className={`${formStep < 3 ? "block" : "hidden"} mt-3`}>
                Step {formStep + 1} of {MAX_STEPS}
              </p>
            </div>
          )}
          {/* the inputs */}
          {formStep >= 0 && (
            <section className={formStep === 0 ? "block" : "hidden"}>
              <div className='user-box'>
                {/* <svg/> */}
                <input
                  className='pl-2 w-full outline-none border-none'
                  placeholder="Nom de l'equipe"
                  type='text'
                  {...register("nom_equipe", {
                    required: "Le Nom de l'equipe est obligatoire",
                  })}
                />
              </div>
              <p className='text-red-500'>{errors.nom_equipe?.message}</p>
              <div className='user-box'>
                {/* <svg/> */}
                <input
                  className='pl-2 w-full outline-none border-none'
                  placeholder='Numero des places'
                  type='text'
                  {...register("nb_places", {
                    required: "Le numero des places est obligatoire",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Numero est invalide",
                    },
                  })}
                />
              </div>
              <p className='text-red-500'>{errors.nb_places?.message}</p>
            </section>
          )}
          {formStep >= 1 && (
            <section className={formStep === 1 ? "block" : "hidden"}>
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
                  {...register("prenom", {
                    required: "Le prenom est obligatoire",
                  })}
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
              <p className='text-red-500'>{errors.phone?.message}</p>
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
            </section>
          )}
          {formStep >= 2 && (
            <section>
              <h2 className='font-semibold text-3xl mb-8'>
                Valider les coordonnées
              </h2>
              <p>Clicker ajouter pour terminer la procédure</p>
            </section>
          )}
          {/* submit button */}
          {formStep !== 2 ? (
            <div
              onClick={formStep === 3 ? undefined : handleStepCompletion}
              className={`mt-6 text-xl cursor-pointer text-white text-center force_white rounded px-8 py-3 w-full disabled:bg-gray-400 ${
                isValid ? "bg-[#0793DB]" : "bg-gray-400"
              }`}>
              Suivant
            </div>
          ) : (
            <button
              type='submit'
              className='mt-6 bg-[#0793DB] text-white force_white rounded px-8 py-6 w-full disabled:bg-gray-400'>
              Ajouter
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEquipeForm;
