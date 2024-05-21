import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./add_collaborateur.form.component.css";

import { dataCollaborateur } from "@/models";
import axios from "axios";

import Swal from "sweetalert2";

const AddCollaborateurForm = (props: any) => {
  const {
    register, // register the input
    handleSubmit, // <- needed to bind the form
    // watch, // to watch the value of a specific input
    reset, // to reset the form
    formState: { errors }, // to get the form state
  } = useForm<dataCollaborateur>();

  const onSubmit = async (data: any) => {
    console.log(data);
    axios.post(`http://127.0.0.1:8000/api/collaborateurs`, data).then((res) => {
      if (res.data.status === 200) {
        handleCloseForm();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Vous avez ajouter un Collaborateur avec success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.status === 400) {
        alert("erroooooooooooooooor");
      }
    });
  };

  const [openForm, setOpenForm] = useState(false);

  const handleCloseForm = () => {
    // reset the form
    props.close();
    openForm && reset();
    setOpenForm(!openForm);
  };

  const [equepes, setEquepes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/equipes").then((res) => {
      setEquepes(res.data.data);
    });
  }, []);

  return (
    <div
      className={`flex align-middle justify-center rounded-md ${
        openForm && "openForm"
      }`}>
      <button
        onClick={() => handleCloseForm()}
        type='button'
        id='label_button'
        className='relative inline-flex items-center justify-center p-4 px-10 py-2.5 mx-2 my-2 overflow-hidden font-medium text-[#07051e] transition duration-300 ease-out border-2 border-[#0793DB] rounded-md shadow-md group'>
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
        <span className='absolute flex items-center justify-center w-full h-full text-[#0793DB] transition-all duration-300 transform group-hover:translate-x-full ease'>
          Ajouter Collaborateur
        </span>
        <span className='relative invisible'>Ajouter Collaborateur</span>
      </button>
      <div className='modal_form'>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}>
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
              {...register("equepe", {
                required: "select equipe s'il vous plait",
              })}>
              {equepes?.map((equepe: any) => (
                <option key={equepe.id} value={equepe.id}>
                  {equepe.name}
                </option>
              ))}
            </select>
          </div>
          <p className='text-red-500'>{errors.equepe?.message}</p>
          <input
            type='submit'
            className='block w-full bg-[#0793DB] mt-4 py-2 rounded-md text-white font-semibold mb-2 cursor-pointer'
            value='Ajouter'
          />
        </form>
      </div>
    </div>
  );
};

export default AddCollaborateurForm;
