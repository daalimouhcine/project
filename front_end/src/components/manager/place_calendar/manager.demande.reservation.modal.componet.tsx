import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ArchiveBoxIcon } from "@/common/icons/archiveBoxIcon";
import { ReturnIcon } from "@/common/icons/returnIcon";
import Swal from "sweetalert2";
import { ThumbUpIcon, XIcon } from "@heroicons/react/outline";

export default function ManagerDemandeReservationComponent({
  date,
  changedDemande,
  demandeInfo,
}: any) {
  const [open, setOpen] = useState(false);

  const [demande, setDemande] = useState<any>(demandeInfo);
  const [collabDemandeInfo, setCollabDemandeInfo] = useState<any>({});

  useEffect(() => {
    console.log(demandeInfo);
  }, [demandeInfo]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/api/collaborateurs/" + demande.collaborateur_id
      )
      .then((res) => {
        setCollabDemandeInfo(res.data.results);
      });
  }, [demandeInfo]);

  const accepterDemandeReservation = () => {
    axios
      .delete("http://127.0.0.1:8000/api/demandes/" + demande.id)
      .then((res) => {
        let reservationInfo = {
          date: new Date(date).toLocaleDateString("en-CA"),
          num_place: demande.num_place,
          equipe_id: demande.manager_id,
          collaborateur_id: demande.collaborateur_id,
        };
        axios
          .post("http://127.0.0.1:8000/api/reservations/", reservationInfo)
          .then((res) => {
            setOpen(false);
            changedDemande();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Vous avez accepter la demande de reservation",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      });
  };

  const refuserDemandeReservation = () => {
    axios
      .delete("http://127.0.0.1:8000/api/demandes/" + demande.id)
      .then((res) => {
        setOpen(false);
        changedDemande();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Vous avez Refuser la demande de reservation",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-blue-700 border-2 border-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:mt-1 outline-none'>
        Plus d'info
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={() => setOpen(false)}>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <div className='inline-block align-bottom bg-gray-100 text-center rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                <div className='flex-1 flex flex-col p-8'>
                  {collabDemandeInfo.image === "default.png" ? (
                    <span className='w-28 h-28 inline-flex items-center justify-center flex-shrink-0 mx-auto rounded-full bg-[#0793DB]'>
                      <span className='text-3xl font-medium leading-none text-white'>
                        {collabDemandeInfo.nom[0].toUpperCase() +
                          collabDemandeInfo.prenom[0].toUpperCase()}
                      </span>
                    </span>
                  ) : (
                    <img
                      className='w-32 h-32 flex-shrink-0 mx-auto rounded-full'
                      src={collabDemandeInfo.image}
                      alt=''
                    />
                  )}
                  <h3 className='mt-2 text-gray-900 text-lg font-medium'>
                    {collabDemandeInfo.nom} {collabDemandeInfo.prenom}
                  </h3>
                  <dl className='flex-grow flex flex-col justify-between'>
                    <dt className='sr-only'>Title</dt>
                    <dd className='mt-3'>
                      <span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                        Collaborateur
                      </span>
                    </dd>
                    <dd className='mt-3 text-gray-500 text-sm'>
                      Demande d'annulation le presence de{" "}
                      {collabDemandeInfo.nom} {collabDemandeInfo.prenom}.
                    </dd>
                    <div className='demandeMessage bg-white break-words h-full mt-3 rounded-md px-5 py-2 text-left'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: demande.message,
                        }}></div>
                    </div>
                  </dl>
                </div>
                <div>
                  <div className='-mt-px flex divide-x divide-gray-200'>
                    <div className='w-0 flex-1 flex'>
                      <button
                        onClick={() => setOpen(false)}
                        className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                        <ReturnIcon
                          className='w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Retour</span>
                      </button>
                    </div>
                    <div className='-ml-px w-0 flex-1 flex'>
                      <button
                        onClick={() => refuserDemandeReservation()}
                        className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
                        <XIcon
                          className='w-15 h-15 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Refuser</span>
                      </button>
                      <button
                        onClick={() => accepterDemandeReservation()}
                        className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
                        <ThumbUpIcon
                          className='w-15 h-15 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Confirmer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
