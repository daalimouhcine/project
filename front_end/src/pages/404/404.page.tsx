/* This example requires Tailwind CSS v2.0+ */
import useLocalStorage from "@/common/hooks/useLocalStorage";
import Not_found from "@/common/images/404";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const [user] = useLocalStorage<any>("data");

  return (
    <div className='bg-white min-h-screen flex flex-col lg:relative'>
      <div className='flex-grow flex flex-col'>
        <main className='flex-grow flex flex-col bg-white'>
          <div className='flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8'>
            <div className='flex-shrink-0 my-auto py-16 sm:py-32'>
              <p className='text-sm font-semibold text-[#0793DB] uppercase tracking-wide'>
                404 error
              </p>
              <h1 className='mt-2 text-4xl font-extrabold text-[#100D3F] tracking-tight sm:text-5xl'>
                Page non trouvée
              </h1>
              <p className='mt-2 text-base text-gray-500'>
                Désolé, nous n'avons pas pu trouver la page que vous recherchez.
              </p>
              <div className='mt-6'>
                {user.role === "rh" ? (
                  <NavLink
                    to='/rh'
                    className='text-base font-medium text-[#0793DB] hover:text-gray-500'>
                    Rentrer à la page d'accueil
                    <span aria-hidden='true'> &rarr;</span>
                  </NavLink>
                ) : user.role === "manager" ? (
                  <NavLink
                    to='/manager'
                    className='text-base font-medium text-[#0793DB] hover:text-gray-500'>
                    Rentrer à la page d'accueil
                    <span aria-hidden='true'> &rarr;</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to='/coll'
                    className='text-base font-medium text-[#0793DB] hover:text-gray-500'>
                    Rentrer à la page d'accueil
                    <span aria-hidden='true'> &rarr;</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className='hidden lg:flex my-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 py-auto'>
        {/* <div className="my-auto"> */}

        <Not_found />
        {/* </div> */}
      </div>
    </div>
  );
};
export default NotFound;
