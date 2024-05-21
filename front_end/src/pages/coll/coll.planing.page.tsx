import CollPlaningCalendarComponent from "@/components/coll/planing/coll.planing.calendar.component";
import CollPlaningPlaceComponent from "@/components/coll/planing/coll.planing.place.component";
import { useState } from "react";

const CollPlaningPage = () => {
  const [calenderDay, setCalenderDay] = useState();
  return (
    <div className='flex w-full justify-around'>
      <div className=' pb-8 max-w-xl'>
        <CollPlaningPlaceComponent selectedCalenderDay={calenderDay} />
      </div>
      <div className='-mt-5 -mr-96'>
        <CollPlaningCalendarComponent setSelectedCalenderDay={setCalenderDay} />
      </div>
    </div>
  );
};

export default CollPlaningPage;
