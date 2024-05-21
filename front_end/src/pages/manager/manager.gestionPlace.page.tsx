import ManagerPlaceComponent from "@/components/manager/place_calendar/manager.place.component";
import ManagerCalendarComponent from "@/components/manager/place_calendar/manager.calendar.component";
import { useState } from "react";

const ManagerGestionPlace = () => {
  const [calenderDay, setCalenderDay] = useState();
  return (
    <div className='flex justify-between md:mt-20 ml-5'>
      <ManagerPlaceComponent selectedCalenderDay={calenderDay} />
      <ManagerCalendarComponent setSelectedCalenderDay={setCalenderDay} />
    </div>
  );
};

export default ManagerGestionPlace;
