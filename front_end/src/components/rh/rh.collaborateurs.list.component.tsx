import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModifierCollaborateurForm from "@/components/rh/update_collaborateur.form.component";

const CollaborateursList = () => {
  const [chengedContent, setChengedContent] = React.useState(true);

  const [getCollaborateur, setGetCollaborateur] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/collaborateurs").then((res) => {
      setGetCollaborateur(res.data.collaborateurs);
    });
  }, [chengedContent]);

  const MySwal = withReactContent(Swal);

  const supprimerCollaborateurs = (suppId: Number) => {
    MySwal.fire({
      title: "etes vous sur?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .delete("http://127.0.0.1:8000/api/collaborateurs/" + suppId)
          .then((res) => {
            if (res.data.status === 200) {
              setChengedContent(!chengedContent);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Collaborateur a été supprimer avec success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const [statusCollaborateur, setStatusCollaborateur] = useState<any>([]);
  var today = new Date();
  const checkForExist = (id: Number) => {
    return statusCollaborateur.some(
      (col: any) =>
        col.collaborateur_id === id &&
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
              <th className='py-3 px-6 text-center'>Status</th>
              <th className='py-3 px-6 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getCollaborateur.map((collaborateur) => (
              <tr
                className='border-b border-gray-200 hover:bg-gray-100'
                key={collaborateur["id"]}>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {collaborateur["image"] === "default.png" ? (
                    <span className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900/30 object-cover border-white border-4'>
                      <span className='text-3xl font-medium leading-none text-white'>
                        {collaborateur["nom"][0] + collaborateur["prenom"][0]}
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
                  {collaborateur["nom"]} {collaborateur["prenom"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {collaborateur["phone"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {collaborateur["email"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {collaborateur["adresse"]}
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap'>
                  {collaborateur["name"]}
                </td>
                <td className={`py-3 px-6 text-center  whitespace-nowrap `}>
                  <p
                    className={` p-2 rounded-lg border-[1px] ${
                      checkForExist(collaborateur["id"])
                        ? "bg-blue-100 text-blue-500 border-blue-500"
                        : "bg-yellow-100 text-yellow-500 border-yellow-500"
                    }`}>
                    {checkForExist(collaborateur["id"])
                      ? "Sure Site"
                      : "A distance"}
                  </p>
                </td>
                <td className='py-3 px-6 text-center  whitespace-nowrap flex gap-6 '>
                  <ModifierCollaborateurForm
                    collaborateur={collaborateur}
                    chengColl={() => setChengedContent(!chengedContent)}
                  />

                  <p
                    onClick={() => {
                      supprimerCollaborateurs(collaborateur["id"]);
                    }}>
                    <i className='fas fa-trash text-[#0793DB] hover:text-purple-500'></i>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CollaborateursList;
