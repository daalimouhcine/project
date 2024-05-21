import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const DemandeReservationForm = ({
  showReservationDemande,
  date,
  num_placeDemande,
  i,
  collaborateur_id,
  manager_id,
  sendDemande,
}: any) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setOpen(showReservationDemande);
    reset();
  }, [showReservationDemande]);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    register("reservationDemandeContent", { required: true, minLength: 12 });
  }, [register, open]);

  const onEditorStateChange = (editorState: any) => {
    setValue("reservationDemandeContent", editorState);
  };

  const onSubmit = (data: any) => {
    let demandeData = {
      type: "reservation",
      message: data.reservationDemandeContent,
      date: new Date(date).toLocaleDateString("en-CA"),
      num_place: num_placeDemande,
      collaborateur_id: collaborateur_id,
      manager_id: manager_id,
    };
    console.log(demandeData);
    axios
      .post("http://127.0.0.1:8000/api/demandes", demandeData)
      .then((res) => {
        if (res.data) {
          sendDemande();
          setOpen(false);
        }
      });
  };

  const editorContent = watch("reservationDemandeContent");

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='inline-flex items-center px-2.5 py-2.5 w-full text-center justify-center border border-transparent text- rounded-md font-medium rounded-b text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:mt-1'>
        Demander la réservation
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 mb-3 font-medium text-gray-900'>
                      Demande de reservation {num_placeDemande}
                    </Dialog.Title>
                    <ReactQuill
                      theme='snow'
                      value={editorContent}
                      onChange={onEditorStateChange}
                    />
                    <p className='font-semibold text-red-500'>
                      {errors.reservationDemandeContent &&
                        "Enter valid content"}
                    </p>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                    Envoyer
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}>
                    Annuler
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DemandeReservationForm;