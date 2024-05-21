import "./manager.place.component.css";
import ReservedPlace from "@/common/images/reserved_place";
import PendingPlace from "@/common/images/pending_place";
import ReadyToReservePlace from "@/common/images/place_ready_to_reserve";
import PlaceUnauthorized from "@/common/images/unauthorized_place";

import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import LoadingPlace from "@/common/images/loadingPlace";
import PendingAnnulationPlace from "@/common/images/pending.annulation_place";
import ManagerDemandeReservationComponent from "./manager.demande.reservation.modal.componet";
import ManagerDemandeAnnulationComponent from "./manager.demande.annulation.modal.component";

const ManagerPlaceComponent = ({ selectedCalenderDay }: any) => {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/equipes").then((res) => {
      setEquipes(res.data.data);
    });
  }, []);

  const [user] = useLocalStorage<any>("data");

  let managerEquipeId = user.user.id;
  const [selectedEquipe, setSelectedEquipe] = useState<Number>(managerEquipeId);
  const [placeNumber, setPlaceNumber] = useState<Number>();
  const [placesInDemande, setPlacesInDemande] = useState<any>([]);
  const [reservedPlaces, setReservedPlaces] = useState<any>([]);
  // declare state to change it when we reserve new collaborateur to get the new list of reserved places
  const [updatedReservation, setUpdatedReservation] = useState<Boolean>(false);
  const [modificationType, setModificationType] = useState<String>();
  const [showUpdatedMessage, setShowUpdatedMessage] = useState<Boolean>(false);

  const [isLoadingPlaces, setIsLoadingPlaces] = useState<Boolean>(true);
  const [isLoadingSelectedColl, setIsLoadingSelectedColl] =
    useState<Boolean>(true);
  const [isLoadingDeletedColl, setIsLoadingDeletedColl] =
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
        setIsLoadingDeletedColl(false);
        modificationType && setShowUpdatedMessage(true);
      });
  }, [
    selectedEquipe,
    selectedCalenderDay,
    updatedReservation,
    modificationType,
  ]);

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

  const [collParEquipe, setCollParEquipe] = useState([]);
  useEffect(() => {
    // function to check if for collaborateurs that doesn't reserve of demanded for places
    const checkIfCollabIdExist = (collabId: Number) => {
      return (
        placesInDemande.some((id: any) => id.collaborateur_id === collabId) ||
        reservedPlaces.some((id: any) => id.collaborateur_id === collabId)
      );
    };

    // get all collaborateurs for a specific equipe ID.
    axios
      .get("http://127.0.0.1:8000/api/collabParEquipe/" + managerEquipeId)
      .then((res) => {
        let collabs: any = [];
        for (let i in res.data.collabs) {
          if (!checkIfCollabIdExist(res.data.collabs[i].id)) {
            collabs.push(res.data.collabs[i]);
          }
        }
        setCollParEquipe(collabs);
      });
  }, [placesInDemande, reservedPlaces, managerEquipeId]);

  // Looping to display places and check for the reservations place and demanded place.
  const placeLoop = () => {
    // checking if the passed place number is demanded by a collaborateur at the selected date
    const demandedPlace = (numPlace: Number) => {
      return placesInDemande.find(
        (n: any) => parseInt(n.num_place) === numPlace
      );
    };

    // checking if the passed place number is reserved by a collaborateur at the selected date
    const reservedPlace = (numPlace: Number) => {
      return reservedPlaces.find(
        (n: any) => parseInt(n.num_place) === numPlace
      );
    };

    const reserveTheSelectedCollab = (numPlace: Number, collabId: Number) => {
      let reservationPlace = {
        equipe_id: managerEquipeId,
        collaborateur_id: collabId,
        num_place: numPlace,
        date: new Date(selectedCalenderDay).toLocaleDateString("en-CA"),
      };
      // send the reservation to the backend
      axios
        .post("http://127.0.0.1:8000/api/reservations", reservationPlace)
        .then((res) => {
          setModificationType("reserved");
          setUpdatedReservation(!updatedReservation);
        });
    };

    const deleteReservation = (idReservation: Number) => {
      // delete reservation from database
      axios
        .delete("http://127.0.0.1:8000/api/reservations/" + idReservation)
        .then((res) => {
          setModificationType("deleted");
          setUpdatedReservation(!updatedReservation);
        });
    };

    const startReservationLoading = (e: any) => {
      e.currentTarget.className += " selected_reserve";
    };

    const getNewData = () => {
      setUpdatedReservation(!updatedReservation);
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
          <div className='dropdown' key={i}>
            <label
              tabIndex={0}
              className='btn bg-transparent border-0 hover:bg-transparent hover:border-0 focus:outline-none p-0 '
              onClick={() => {
                setSelectedPlaceInfo(reservedPlace(i));
              }}>
              <PendingAnnulationPlace className='w-32 h-32' key={i} />
            </label>
            <div
              tabIndex={0}
              className='dropdown-content card card-compact w-64 p-2 shadow bg-[#ffecb2] focus:outline-none'>
              <div className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
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
                    <span className='inline-flex items-center my-2 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800'>
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
                    {/* delete button */}
                    {selectedEquipe === managerEquipeId &&
                      (isLoadingSelectedColl ? (
                        <Skeleton width={70} height={30} />
                      ) : (
                        <ManagerDemandeAnnulationComponent
                          changedDemande={getNewData}
                          demandeInfo={demandedPlace(i)}
                          reservedInfo={reservedPlace(i)}
                        />
                      ))}
                  </div>
                </div>
                {selectedEquipe === managerEquipeId && (
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
                )}
              </div>
            </div>
          </div>
        ) : // if this place has a reserved
        reservedPlace(i) ? (
          <div className='dropdown' key={i}>
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
              className='dropdown-content card card-compact w-64 p-2 shadow bg-[#c5d7ff] focus:outline-none'>
              <div className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
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
                    <span className='inline-flex items-center my-2 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800'>
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
                    {/* delete button */}
                    {selectedEquipe === managerEquipeId &&
                      (isLoadingSelectedColl ? (
                        <Skeleton width={70} height={30} />
                      ) : (
                        <button
                          type='button'
                          className='inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-red-700 border-2 border-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:mt-1 outline-none'
                          onClick={() => {
                            setIsLoadingDeletedColl(true);
                            deleteReservation(reservedPlace(i).id);
                          }}>
                          {isLoadingDeletedColl ? (
                            <>
                              <svg
                                className='animate-spin h-4 w-4 mr-1 text-red-600'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'>
                                <circle
                                  className='opacity-25'
                                  cx='12'
                                  cy='12'
                                  r='10'
                                  stroke='currentColor'
                                  strokeWidth='4'></circle>
                                <path
                                  className='opacity-75'
                                  fill='currentColor'
                                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                              </svg>
                              Deleting...
                            </>
                          ) : (
                            "Supprimer"
                          )}
                        </button>
                      ))}
                  </div>
                </div>
                {selectedEquipe === managerEquipeId && (
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
                )}
              </div>
            </div>
          </div>
        ) : // if this place has a demanded
        demandedPlace(i) ? (
          <div className='dropdown' key={i}>
            <label
              tabIndex={0}
              className='btn bg-transparent border-0 hover:bg-transparent hover:border-0 focus:outline-none p-0 '
              onClick={() => {
                setSelectedPlaceInfo(demandedPlace(i));
              }}>
              <PendingPlace className='w-32 h-32' />
            </label>
            <div
              tabIndex={0}
              className='dropdown-content card card-compact w-64 p-2 shadow bg-[#ffecb2] focus:outline-none'>
              <div className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
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
                    <span className='inline-flex items-center my-2 px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800'>
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
                    {/* delete button */}
                    {selectedEquipe === managerEquipeId &&
                      (isLoadingSelectedColl ? (
                        <Skeleton width={70} height={30} />
                      ) : (
                        <ManagerDemandeReservationComponent
                          changedDemande={() => getNewData()}
                          demandeInfo={demandedPlace(i)}
                          date={selectedCalenderDay}
                        />
                      ))}
                  </div>
                </div>
                {selectedEquipe === managerEquipeId && (
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
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='dropdown dropdown-end' key={i}>
            <label
              tabIndex={0}
              className='btn bg-transparent border-0 hover:bg-transparent hover:border-0 focus:outline-none p-0'>
              <ReadyToReservePlace className='w-32 h-32' />
            </label>
            {selectedEquipe === managerEquipeId && (
              <ul
                tabIndex={0}
                className='menu dropdown-content p-2 shadow bg-[#def7e5] rounded-box w-fit mt-1 focus:outline-none '>
                {collParEquipe.length > 0 ? (
                  collParEquipe.map((coll: any) => (
                    <li
                      key={coll.id}
                      className='col-span-1 flex shadow-sm rounded-md'
                      onClick={(e) => {
                        startReservationLoading(e);
                        reserveTheSelectedCollab(i, coll.id);
                      }}>
                      <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate hover:bg-[#def7e5]'>
                        <p
                          className={`bg-[#b9f4ca] flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md py-4`}>
                          {coll.nom[0] + " " + coll.prenom[0]}
                        </p>
                        <div className='flex-1 px-4 py-2 text-sm truncate'>
                          <p className='text-gray-900 font-medium hover:text-gray-600'>
                            {coll.nom + " " + coll.prenom}
                          </p>
                          <p className='text-gray-500'>{coll.email}</p>
                        </div>
                        <div
                          className='flex-shrink-0 pr-2 hidden hidden_for_reserve'
                          id='reservation_loading'>
                          <svg
                            className='animate-spin h-5 w-full mr-1 text-green-600'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'>
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                          </svg>
                          <p className='text-sm font-medium text-green-900'>
                            Reserving...
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className='bg-white p-2 w-max rounded-xl font-semibold'>
                    <h3 className='text-green-900'>Touts a reserver</h3>
                  </div>
                )}
              </ul>
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
              show={showUpdatedMessage}
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
                        Successfully {modificationType}!
                      </p>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex'>
                      <button
                        className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => {
                          setShowUpdatedMessage(false);
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
              <LoadingPlace className='w-full h-full -mt-10 mb-5' />
            )}
            {
              // calling the function that loop into all places and check there status, it return an array of html elements after handling the all places status for the selected date.
              placeLoop()
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerPlaceComponent;
