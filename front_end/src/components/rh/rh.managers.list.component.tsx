import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ModifierManagerForm from "@/components/rh/update_manager.form.component";

const MangersList = () => {
  const [chengedContent, setChengedContent] = React.useState(true);
  const [getManagers, setGetManagers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/managers").then((res) => {
      setGetManagers(res.data.data);
    });
  }, [chengedContent]);

  const supprimerManager = (suppId: Number) => {
    Swal.fire({
      title: "ete vous sur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .delete("http://127.0.0.1:8000/api/managers/" + suppId)
          .then((res) => {
            if (res.data.status === 200) {
              setChengedContent(!chengedContent);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Manager a été supprimer avec success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <div className='bg-white rounded-lg shadow overflow-y-auto'>
        <table className='bg-white w-full'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Image</th>
              <th className='py-3 px-6 text-left'>Nom & Prenom</th>
              <th className='py-3 px-6 text-center'>phone</th>
              <th className='py-3 px-6 text-center'>Email</th>
              <th className='py-3 px-6 text-center'>Adresse</th>
              <th className='py-3 px-6 text-center'>Equipe</th>
              <th className='py-3 px-6 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getManagers.map((manager) => (
              <tr
                className='border-b border-gray-200 hover:bg-gray-100'
                key={manager["id"]}>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["image"] === "default.png" ? (
                    <span className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900/30 object-cover border-white border-4'>
                      <span className='text-3xl font-medium leading-none text-white'>
                        {manager["nom"][0] + manager["prenom"][0]}
                      </span>
                    </span>
                  ) : (
                    <img
                      src="@/common/image/{collaborateur['image']}"
                      alt='collaborateur'
                    />
                  )}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["nom"]} {manager["prenom"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["phone"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["email"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["adresse"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {manager["name"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap flex gap-6'>
                  <ModifierManagerForm
                    manager={manager}
                    chengManager={() => setChengedContent(!chengedContent)}
                  />

                  <a
                    onClick={() => {
                      supprimerManager(manager["id"]);
                    }}>
                    <i className='fas fa-trash text-[#0793DB] hover:text-purple-500'></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MangersList;
