import "./coll.place.component.css";
import ReservedPlace from "@/common/images/reserved_place";
import PendingPlace from "@/common/images/pending_place";
import ReadyToReservePlace from "@/common/images/place_ready_to_reserve";
import PendingAnnulationPlace from "@/common/images/pending.annulation_place";
import PlaceUnauthorized from "@/common/images/unauthorized_place";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import LoadingPlace from "@/common/images/loadingPlace";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DemandeAnnulerReservationForm from "./demande.annuler.reservation.form";
import DemandeReservationForm from "./demande.reservation.form";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const CollPlaningPlaceComponent = ({ selectedCalenderDay }: any) => {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/equipes").then((res) => {
      setEquipes(res.data.data);
    });
  }, []);

  let [userRole] = useLocalStorage<any>("data");

  let collabEquipeId = userRole.user.equipe_id;
  let collabId = userRole.user.id;
  const [havePlace, setHavePlace] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<Number>(
    userRole.user.equipe_id
  );
  const [placeNumber, setPlaceNumber] = useState<Number>();
  const [placesInDemande, setPlacesInDemande] = useState<any>([]);
  const [reservedPlaces, setReservedPlaces] = useState<any>([]);
  // declare state to change it when we reserve new collaborateur to get the new list of reserved places
  const [demandeType, setDemandeType] = useState<String>();
  const [showUpdatedMessage, setShowUpdatedMessage] = useState<Boolean>(false);

  const [isLoadingPlaces, setIsLoadingPlaces] = useState<Boolean>(true);
  const [isLoadingSelectedColl, setIsLoadingSelectedColl] =
    useState<Boolean>(true);

  const [showAnnulerDemande, setShowAnnulerDemande] = useState<Boolean>(false);
  const [sendDemande, setSendDemande] = useState<Boolean>(false);
  const [showReservationDemande, setShowReservationDemande] =
    useState<Boolean>(false);

  useEffect(() => {
    // get the number of places for the selected Team
    axios
      .get("http://127.0.0.1:8000/api/equipes/" + selectedEquipe)
      .then((res) => {
        setPlaceNumber(res.data.Equipe[0].nb_places);
      });

    // get all the places with the status of them all
    let reservationsPlaces = {
      equipe_id: selectedEquipe,
      date: new Date(selectedCalenderDay).toLocaleDateString("en-CA"),
    };

    axios
      .post("http://127.0.0.1:8000/api/reservations-places", reservationsPlaces)
      .then((res) => {
        let data = res.data.data;
        let demanded = [];
        let reserved = [];
        for (let i in data) {
          data[i][0].type
            ? demanded.push(data[i][0])
            : reserved.push(data[i][0]);
        }
        setPlacesInDemande(demanded);
        setReservedPlaces(reserved);
        demandeType && setShowUpdatedMessage(true);
      });
  }, [selectedEquipe, selectedCalenderDay, demandeType, sendDemande]);

  const [selectedCollInfo, setSelectedCollInfo] = useState<any>({});
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState<any>({});

  // get the info of the selected collaborator for a reserved place
  useEffect(() => {
    setIsLoadingSelectedColl(true);
    setSelectedCollInfo({});
    axios
      .get(
        "http://127.0.0.1:8000/api/collaborateurs/" +
          selectedPlaceInfo.collaborateur_id
      )
      .then((res) => {
        setSelectedCollInfo(res.data.results);
        setIsLoadingSelectedColl(false);
      });
  }, [selectedPlaceInfo]);

  // Looping to display places and check for the reservations place and demanded place.
  const PlaceLoop = () => {
    // checking if the passed place number is demanded by a collaborateur at the selected date
    const demandedPlace = (numPlace: Number) => {
      return placesInDemande.some(
        (n: any) => parseInt(n.num_place) === numPlace
      );
    };

    // checking if the passed place number is reserved by a collaborateur at the selected date
    const reservedPlace = (numPlace: Number) => {
      return reservedPlaces.find(
        (n: any) => parseInt(n.num_place) === numPlace
      );
    };

    const sendDemandedAnnulation = () => {
      // send the reservation to the backend
      setDemandeType("demanded the annulation");
      setSendDemande(!sendDemande);
    };

    const sendDemandedReservation = () => {
      // send the reservation to the backend
      setDemandeType("demanded the reservation");
      setSendDemande(!sendDemande);
    };

    // check if the logged in collaborateur reserved the passed place number
    const isCollReservedPlace = (numPlace: Number) => {
      return reservedPlaces.find(
        (e: any) =>
          parseInt(e.num_place) === numPlace && e.collaborateur_id === collabId
      );
    };

    // check if the logged in collaborateur demanded the passed place number
    const isCollDemandedPlace = (numPlace: Number) => {
      return placesInDemande.some(
        (e: any) =>
          parseInt(e.num_place) === numPlace && e.collaborateur_id === collabId
      );
    };

    // declare variable to store the places;
    let places: any = [];

    // variable to count to 3 and set 1 red place
    let l: any = 0;
    for (let i = 1; i <= placeNumber!; i++) {
      // @ts-ignore
      let e = i + parseInt(placeNumber);
      if (l === 2) {
        places.push(<PlaceUnauthorized className='w-32 h-32' key={e} />);
        l = 0;
      } else {
        l++;
      }

      // push to the place array
      places.push(
        // if this place has a reserved and demanded to cancel the reservation
        reservedPlace(i) && demandedPlace(i) ? (
          <div
            key={i}
            className={`dropdown ${
              isCollReservedPlace(i) &&
              "bg-[#ffecb2] rounded-xl border-2 border-[#fae094]"
            }`}>
            <PendingAnnulationPlace className='w-32 h-32' />
          </div>
        ) : // if this place has a reserved
        reservedPlace(i) ? (
          <div
            key={i}
            className={`dropdown ${
              isCollReservedPlace(i) &&
              "bg-[#c5d7ff] rounded-xl border-2 border-[#9cbafc]"
            }`}>
            {/* // @ts-ignore */}
            <label
              tabIndex={0}
              className='btn bg-transparent border-0 hover:bg-transparent hover:border-0 focus:outline-none p-0 '
              onClick={() => {
                setSelectedPlaceInfo(reservedPlace(i));
              }}>
              <ReservedPlace className='w-32 h-32' />
            </label>
            <div
              tabIndex={0}
              className={`dropdown-content card card-compact w-64 p-2 shadow bg-[#c5d7ff] focus:outline-none ${
                isCollReservedPlace(i) && "mt-1"
              }`}>
              <div className='flex flex-col justify-center col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
                <div className='w-full flex items-center justify-between py-2 px-4 space-x-6'>
                  <div className='flex flex-col gap-2 mt-2 flex-1 truncate'>
                    <div className='flex items-center space-x-3'>
                      <h3 className='text-gray-900 pl-2 text-sm font-medium truncate'>
                        {isLoadingSelectedColl ? (
                          <Skeleton width={100} height={20} />
                        ) : (
                          selectedCollInfo.nom + " " + selectedCollInfo.prenom
                        )}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex w-fit items-center my-2 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 `}>
                      Collaborateur
                    </span>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1'>
                    {selectedCollInfo.image === "default.png" ? (
                      <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500'>
                        <span className='text-xs font-medium leading-none text-white'>
                          {isLoadingSelectedColl ? (
                            <Skeleton width={50} height={50} circle />
                          ) : (
                            selectedCollInfo.nom[0].toUpperCase() +
                            selectedCollInfo.prenom[0].toUpperCase()
                          )}
                        </span>
                      </span>
                    ) : (
                      <img
                        className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                        src={selectedCollInfo.image}
                        alt=''
                      />
                    )}
                  </div>
                </div>
                {selectedEquipe === collabEquipeId &&
                  (isCollReservedPlace(i) ? (
                    <>
                      <button
                        type='button'
                        className='inline-flex items-center px-2.5 py-2.5 w-full text-center justify-center border border-transparent text-xs font-medium rounded-b text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:mt-1'
                        onClick={() => {
                          setShowAnnulerDemande(true);
                        }}>
                        Annuler la réservation
                      </button>
                      <DemandeAnnulerReservationForm
                        closeForm={() => setShowAnnulerDemande(false)}
                        sendDemande={() => sendDemandedAnnulation()}
                        showAnnulerDemande={showAnnulerDemande}
                        num_place={i}
                        date={selectedCalenderDay}
                        collaborateur_id={collabId}
                        manager_id={collabEquipeId}
                      />
                    </>
                  ) : (
                    <div>
                      <div className='-mt-px flex divide-x divide-gray-200'>
                        <div className='w-0 flex-1 flex'>
                          <a
                            href={`mailto:${selectedCollInfo.email}`}
                            className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                            <MailIcon
                              className='w-5 h-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span className='ml-3'>Email</span>
                          </a>
                        </div>
                        <div className='-ml-px w-0 flex-1 flex'>
                          <a
                            href={`tel:${selectedCollInfo.telephone}`}
                            className='relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
                            <PhoneIcon
                              className='w-5 h-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span className='ml-3'>Call</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : // if this place has a demanded
        demandedPlace(i) ? (
          <div
            key={i}
            className={`dropdown ${
              isCollDemandedPlace(i) &&
              "bg-[#ffecb2] rounded-xl border-2 border-[#fde290]"
            }`}>
            <PendingPlace className='w-32 h-32' />
          </div>
        ) : (
          <div className='dropdown dropdown-end' key={i}>
            <label
              tabIndex={0}
              className='btn bg-transparent border-0 hover:bg-transparent hover:border-0 focus:outline-none p-0'>
              <ReadyToReservePlace className='w-32 h-32' />
            </label>
            {userRole.user.equipe_id === selectedEquipe &&
              !isCollDemandedPlace(i) &&
              !isCollReservedPlace(i) && (
                <div
                  tabIndex={0}
                  className={`menu dropdown-content p-2 shadow bg-[#def7e5] rounded-box w-fit mt-1 focus:outline-none ${
                    isCollReservedPlace(i) ? "hidden" : "block"
                  } `}>
                  <div className='bg-white p-2 w-max rounded-xl font-semibold'>
                    <DemandeReservationForm
                      sendDemande={() => sendDemandedReservation()}
                      showReservationDemande={showReservationDemande}
                      num_placeDemande={i}
                      date={selectedCalenderDay}
                      collaborateur_id={collabId}
                      manager_id={collabEquipeId}
                    />
                  </div>
                </div>
              )}
          </div>
        )
      );
    }

    // add loading animation to turn off after loading the places
    isLoadingPlaces && places.length > 0 && setIsLoadingPlaces(false);

    // return places array
    return places;
  };

  // main return component
  return (
    <>
      <div className='flex-col flex-1 h-fit lg:-mr-20 md:mr-0'>
        <div
          aria-live='assertive'
          className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50 sm:items-start'>
          <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              // @ts-ignore
              show={sendDemande}
              as={Fragment}
              enter='transform ease-out duration-300 transition'
              enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
              enterTo='translate-y-0 opacity-100 sm:translate-x-0'
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='p-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <CheckCircleIcon
                        className='h-6 w-6 text-green-400'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='ml-3 w-0 flex-1 pt-0.5'>
                      <p className='text-sm font-medium text-gray-900'>
                        Successfully {demandeType}!
                      </p>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex'>
                      <button
                        className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => {
                          setSendDemande(false);
                        }}>
                        <span className='sr-only'>Close</span>
                        <XIcon className='h-5 w-5' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div className='flex flex-col mt-5 gap-3'>
          <div className='flex'>
            <div className='w-full flex justify-around bg-white rounded-md'>
              <b>{`Team: ${selectedEquipe}`}</b>
              <b>{`Team manager: manager`}</b>
              <b>{`Day: ${new Date(selectedCalenderDay).toLocaleDateString(
                "fr"
              )}`}</b>
            </div>
          </div>
          <div className='flex flex-wrap p-5 justify-around gap-5 bg-gradient-to-b from-white to-gray-100 border border-gray-200 rounded-md'>
            {equipes?.map((equipe: any) => (
              <div
                className={`button-borders my-2 ${
                  selectedEquipe === equipe.id && "selected_team"
                }`}
                onClick={() => setSelectedEquipe(equipe.id)}>
                <button className='primary-button'>{equipe.name}</button>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-row justify-around space_posts h-full w-full mt-10 '>
          <div className='flex flex-row gap-2 w-fit flex-wrap justify-center'>
            {isLoadingPlaces && (
              //
              <LoadingPlace className='w-full h-full -mt-10 mb-5' />
            )}
            {
              // calling the function that loop into all places and check there status, it return an array of html elements after handling the all places status for the selected date.
              PlaceLoop()
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default CollPlaningPlaceComponent;
