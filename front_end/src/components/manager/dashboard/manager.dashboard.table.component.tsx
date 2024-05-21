import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ManagerDashboardModalComponent from "./manager.dashboard.modal.reservation.component";
import useLocalStorage from "@/common/hooks/useLocalStorage";

export default function ManagerDashboardTableComponent() {
  const [demandes, setDemandes] = useState<any>([]);
  const [user] = useLocalStorage<any>("data");
  let info = {
    equipe_id: user.user.equipe_id,
  };
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/demandes-equipes/", info)
      .then((res) => {
        setDemandes(res.data.data);
        console.log(res.data.data);
      });
  }, []);

  const [messageOpen, setMessageOpen] = useState(false);

  const closeMessage = () => {
    setMessageOpen(false);
  };

  return (
    <div className=' mx-auto '>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
        <table className='w-full text-sm text-left text-gray-500 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Compte
              </th>
              <th scope='col' className='px-6 py-3'>
                Type
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande: any, index: any) => (
              <tr className='bg-white border-b  hover:bg-gray-50 '>
                <td
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'>
                  <p>
                    {demande.nom} {demande.prenom}
                  </p>
                  <p className='text-gray-500'>{demande.email}</p>
                </td>
                <td className='px-6 py-4'>
                  {/* {
										demande.message.length > 10 ? demande.message.substring(0, 10) + '...' : demande.type
									} */}
                  {demande.type}
                </td>
                <td className='px-6 py-4'>{demande.date}</td>
                <td className='px-6 py-4 text-right'>
                  <ManagerDashboardModalComponent
                    closeMessage={closeMessage}
                    messageOpen={messageOpen}
                    demande={demande}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
