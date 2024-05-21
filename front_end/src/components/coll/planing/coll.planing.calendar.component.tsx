import { useEffect, useState, Fragment } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
// import date-fns that simplify the manupilation dates for the calendar component
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";

import {
  ArrowLeftIcon,
  CalendarIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";

import "./coll.calendar.form.component.css";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const CollPlaningCalendarComponent = ({ setSelectedCalenderDay }: any) => {
  
  const [reservationDates, setReservationDates] = useState<Array<Date>>([]);

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  useEffect(() => {
    setSelectedCalenderDay(selectedDay);
  }, [selectedDay]);

  // this variable is to get all days for specific month.
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // previousMonth is for going to the previous month.
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // nextMonth is for going to the next month.
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // calendarOpen state is used to handle toggling the calendar side.
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <>
      <div className=''>
        <Transition.Root show={calendarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40' onClose={setCalendarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 flex flex-row-reverse z-40'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='relative flex-1 flex flex-col max-w-lg w-full'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute top-0 left-0 -ml-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setCalendarOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg_calendar overflow-x-hidden '>
                    <div className='h-fit year_part_calendar mt-10'>
                      <h2 className='year_big_bg'>
                        {format(firstDayCurrentMonth, "yyyy")}
                      </h2>
                      <h2 className='year_big_title'>
                        {format(firstDayCurrentMonth, "yyyy")}
                      </h2>
                    </div>
                    <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
                      <div className='flex items-center flex-shrink-0 px-4 mt-10'>
                        <div className='m-auto w-full flex justify-center'>
                          <div className='w-full px-4 sm:px-7 md:px-6'>
                            <div className='md:grid w-full md:divide-gray-200'>
                              <div className='flex justify-between w-full my-8'>
                                <button
                                  type='button'
                                  onClick={previousMonth}
                                  className='w-10 h-10 font-bold text-white hover:text-[#259dad] hover:bg-white rounded-full transition-all linear'>
                                  <span className='sr-only'>
                                    Previous month
                                  </span>
                                  <ChevronLeftIcon
                                    className='w-10 h-10 pr-1'
                                    aria-hidden='true'
                                  />
                                </button>
                                <h2 className='font-bold md:text-3xl lg:text-5xl text-white -mt-3'>
                                  {format(firstDayCurrentMonth, "MMMM")}
                                </h2>
                                <button
                                  onClick={nextMonth}
                                  type='button'
                                  className='w-10 h-10 font-bold text-white hover:text-[#259dad] hover:bg-white rounded-full transition-all linear'>
                                  <span className='sr-only'>Next month</span>
                                  <ChevronRightIcon
                                    className='w-10 h-10 pl-1'
                                    aria-hidden='true'
                                  />
                                </button>
                              </div>
                              <div className='grid grid-cols-7 mt-10 text-lg font-bold leading-6 text-center text-white'>
                                <div>S</div>
                                <div>M</div>
                                <div>T</div>
                                <div>W</div>
                                <div>T</div>
                                <div>F</div>
                                <div>S</div>
                              </div>
                              <div className='grid grid-cols-7 mt-5 text-sm'>
                                {days.map((day, dayIdx) => (
                                  <div
                                    key={day.toString()}
                                    className={classNames(
                                      dayIdx === 0 &&
                                        colStartClasses[getDay(day)],
                                      "py-1.5 my-2 font-semibold"
                                    )}>
                                    <button
                                      type='button'
                                      disabled={
                                        reservationDates!.some((date: Date) =>
                                          isEqual(date, day)
                                        )
                                          ? true
                                          : false
                                      }
                                      onClick={() => setSelectedDay(day)}
                                      className={classNames(
                                        reservationDates.map(
                                          (date: Date) =>
                                            isEqual(date, day) &&
                                            " disable_date "
                                        ),
                                        isEqual(day, selectedDay) &&
                                          " text-white ",
                                        !isEqual(day, selectedDay) &&
                                          isToday(day) &&
                                          " font-bold text-white ",
                                        !isEqual(day, selectedDay) &&
                                          !isToday(day) &&
                                          isSameMonth(
                                            day,
                                            firstDayCurrentMonth
                                          ) &&
                                          " text-blue-50 ",
                                        !isEqual(day, selectedDay) &&
                                          !isToday(day) &&
                                          !isSameMonth(
                                            day,
                                            firstDayCurrentMonth
                                          ) &&
                                          " text-gray-400 ",
                                        isEqual(day, selectedDay) &&
                                          isToday(day) &&
                                          " bg-red-500 font-bold text-white",
                                        isEqual(day, selectedDay) &&
                                          !isToday(day) &&
                                          "bg-gray-900",
                                        !isEqual(day, selectedDay) &&
                                          " hover:bg-gray-700 ",
                                        (isEqual(day, selectedDay) ||
                                          isToday(day)) &&
                                          "font-semibold",
                                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                      )}>
                                      <time
                                        dateTime={format(day, "yyyy-MM-dd")}>
                                        {format(day, "d")}
                                      </time>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='flex-shrink-0 w-14'>
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <button
        type='button'
        onClick={() => setCalendarOpen(true)}
        className='relative h-fit inline-flex items-center justify-center p-4 px-16 py-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-white rounded-md shadow-md group'>
        <span className='absolute inset-0 flex items-center justify-center w-full h-full text-[#0284c7] duration-300 translate-x-full bg-white group-hover:-translate-x-0 ease'>
          <ArrowLeftIcon className='h-16 w-16' aria-hidden='true' />
        </span>
        <span className='absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:-translate-x-full ease'>
          <CalendarIcon className='h-16 w-16' aria-hidden='true' />
        </span>
        <span className='relative invisible'>
          <MenuIcon />
        </span>
      </button>
    </>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CollPlaningCalendarComponent;
