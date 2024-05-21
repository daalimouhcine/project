import { useEffect, useState } from "react";
import axios from "axios";
import { managerData } from "@/models";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import CollaborateursList from "../rh/rh.collaborateurs.list.component";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const ManagerProfileComponent = () => {
  const [managerData, setManagerData] = useState<managerData>();
  const [getCollaborateur, setGetCollaborateur] = useState([]);

  const [user] = useLocalStorage<any>("data");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/managers/" + user.user.id)
      .then((res) => {
        if (res.status === 200) {
          setManagerData(res.data.results);
        }
      });
  }, []);

  useEffect(() => {
    reset(managerData);
  }, [managerData]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/managers-equipes/" + user.user.equipe_id)
      .then((res) => {
        if (res.status === 200) {
          setGetCollaborateur(res.data.collabs);
          console.log(res.data.collabs);
        }
      });
  }, []);

  const {
    register, // register the input
    handleSubmit, // <- needed to bind the form
    // watch, // to watch the value of a specific input
    reset, // to reset the form
    formState: { errors }, // to get the form state
  } = useForm<managerData>({ defaultValues: managerData });

  const updateManager = (data: managerData) => {
    console.log(data);
  };

  return (
    <div className='w-full '>
      <div className='w-full relative mt-4 s rounded my-24 overflow-hidden '>
        <div className='top h-64 w-full bg-blue-600 overflow-hidden relative'>
          <img
            src='https://images.unsplash.com/photo-1503480207415-fdddcc21d5fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
            className='bg w-full h-full object-cover object-center absolute z-0'
          />
          <div className='flex flex-col justify-center items-center relative h-full text-black'>
            {managerData?.image === "default.png" ? (
              <span className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-black object-cover border-white border-4'>
                <span className='text-3xl font-medium leading-none text-white'>
                  {managerData?.nom[0].toUpperCase() +
                    managerData!.prenom[0].toUpperCase()}
                </span>
              </span>
            ) : (
              <img
                className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                src={managerData?.image}
                alt=''
              />
            )}
            <h1 className='text-2xl font-semibold'>
              {managerData?.nom + " " + managerData?.prenom}
            </h1>
            <h4 className='text-sm font-semibold'>Manager</h4>
          </div>
        </div>
      </div>
      <>{/*  about section */}</>

      <div className='bg-white p-10 shadow-sm rounded-sm'>
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
          <span className='tracking-wide'>About</span>
        </div>
        <form
          action=''
          onSubmit={handleSubmit(updateManager)}
          className='text-gray-700'>
          <div className='grid md:grid-cols-2 text-sm'>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>First Name</div>
              <input
                className=''
                type='text'
                {...register("nom", { required: "Le nom est obligatoire" })}
              />
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Last Name</div>
              <div className='flex flex-col'>
                <input
                  type='text'
                  {...register("prenom", {
                    required: "Le prenom est obligatoire",
                  })}
                />
                <p className='text-red-500'>{errors.prenom?.message}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Contact No.</div>
              <div className='flex flex-col'>
                <input
                  type='text'
                  {...register("phone", {
                    required: "Le Num de telephone est obligatoire",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Numero est invalide",
                    },
                  })}
                />
                <p className='text-red-500'>{errors.phone?.message}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Current Address</div>
              <div className='flex flex-col'>
                <input
                  type='text'
                  {...register("adresse", {
                    required: "L'adresse est obligatoire",
                  })}
                />
                <p className='text-red-500'>{errors.adresse?.message}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='px-4 py-2 font-semibold'>Email.</div>
              <div className='px-4 py-2'>
                <a className='text-blue-700 -mx-4 ' href={managerData?.email}>
                  {managerData?.email}
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 '>
              <span className='absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease'></span>
              <span className='relative text-indigo-600 transition duration-300 group-hover:text-white ease'>
                Update Profile
              </span>
            </button>
          </div>{" "}
        </form>
      </div>

      <>{/* End of about section */}</>

      <>{/*  team section */}</>

      <div className='bg-white p-10 my-10 hover:shadow'>
        <div className='flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8'>
          <span className='text-blue-500'>
            <svg
              className='h-5 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </span>
          <span>Manager's Team</span>
        </div>
        <div className='grid grid-cols-3 my-2 '>
          {getCollaborateur.map((c: any) => (
            <div
              className='text-center flex justify-start flex-col-2 my-2 gap-2'
              key={c["id"]}>
              {c["image"] === "default.png" ? (
                <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black border-white border-4'>
                  <span className='text-xs font-medium leading-none text-white'>
                    {c["nom"][0].toUpperCase() + c["prenom"][0].toUpperCase()}
                  </span>
                </span>
              ) : (
                <img
                  className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                  src={c["image"]}
                  alt=''
                />
              )}
              <p className='text-main-color my-2 '>
                {c["nom"] + " " + c["prenom"]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <>{/*  end of team section */}</>
    </div>
  );
};

export default ManagerProfileComponent;
