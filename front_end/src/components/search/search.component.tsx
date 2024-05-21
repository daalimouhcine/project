import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const SearchComponent = () => {
  const {
    register, // register the input
    handleSubmit, // <- needed to bind the form
    watch, // to watch the value of a specific input
    reset, // to reset the form
    formState: { errors }, // to get the form state
  } = useForm<any>();

  const [user] = useLocalStorage<any>("data");

  const [search, setSearch] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/api/collaborateurs-search/" + [watch("search")]
      )
      .then((res) => {
        setSearch(res.data.collaborateurs);
      });
  }, [watch("search")]);

  return (
    <>
      <form className='bg-white rounded flex items-center w-full max-w-xl mr-40 p-2  shadow-sm border border-gray-200'>
        <input
          type='search'
          {...register("search")}
          placeholder='Search'
          className='w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent'
        />
      </form>

      <div
        className={`flex justify-end absolute top-16 right-40 w-[27rem] md:w-[36rem] z-20 ${
          watch("search") ? "block" : "hidden"
        }`}>
        <div className='w-full text-sm text-left  '>
          {search.map((s: any) =>
            s.equipe_id === user.user.equipe_id || user.role === "rh" ? (
              <NavLink
                to={"searchProfile/" + s.id}
                onClick={() => reset()}
                className='bg-gray-100 flex border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#0793DB]  hover:text-white'>
                <img
                  src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                  alt=' Collaborateur'
                  className='h-10 rounded-full m-2'
                />
                <p className='px-6 py-4'>{s.nom}</p>
                <p className='px-6 py-4'>{s.prenom}</p>
              </NavLink>
            ) : (
              <div className='bg-gray-100 flex border-b dark:bg-gray-800 dark:border-gray-700'>
                <img
                  src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
                  alt=' Collaborateur'
                  className='h-10 rounded-full m-2'
                />
                <p className='px-6 py-4'>{s.nom}</p>
                <p className='px-6 py-4'>{s.prenom}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default SearchComponent;
