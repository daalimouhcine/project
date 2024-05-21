import { Fragment, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import {
  format,
  startOfToday,
  compareAsc,
  startOfMonth,
  isToday,
  isSameMonth,
  isEqual,
  nextMonday,
  getDay,
  parseISO,
  isSameDay,
} from "date-fns";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  parse,
  startOfWeek,
} from "date-fns/esm";
import axios from "axios";
import useLocalStorage from "@/common/hooks/useLocalStorage";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function Meeting({ coll, surSites }: any) {
  return (
    <li
      key={coll.id}
      className='group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-200 bg-gray-100'>
      {coll.image === "default.png" ? (
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400'>
          <span className='text-xs font-medium leading-none text-white'>
            {coll.nom[0].toUpperCase() + coll.prenom[0].toUpperCase()}
          </span>
        </span>
      ) : (
        <img
          className='w-32 h-32 flex-shrink-0 mx-auto rounded-full'
          src={coll.image}
          alt=''
        />
      )}
      <div className='flex-auto '>
        <div className='grid grid-cols-2 gap-4 place-content-stretch'>
          <p className='text-gray-900'>{coll.nom + " " + coll.prenom}</p>
          <p className=''>
            <b
              className={`${
                surSites.indexOf(coll.id) !== -1
                  ? " text-[#0793DB]"
                  : " text-gray-500"
              }`}>
              {surSites.indexOf(coll.id) !== -1 ? "Sur Site" : "A distance"}
            </b>
          </p>
        </div>

        <p className='mt-0.5'>
          <p>{coll.email}</p>
        </p>
      </div>
      <Menu as='div' className='relative  group-hover:opacity-100'>
        <div>
          <Menu.Button className='-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-white hover:bg-[#0793DB]'>
            <span className='sr-only'>Open options</span>
            <DotsVerticalIcon className='h-6 w-6' aria-hidden='false' />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}>
                    Modifier
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}>
                    Profile
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

const mapToArray = (arr = []) => {
  const res: any = [];
  arr.forEach(function (obj, index) {
    const key = Object.keys(obj)[0];
    const value = parseInt(key, 10);
    res.push(obj[key]);
  });
  return res;
};

export default function ManagerDashboardCalendarComponent() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const [collabs, setCollabs] = useState<any>([]);
  const [surSites, setSurSites] = useState([]);
  // const [nbrSurSite,setNbrSurSite] = useState();
  const [user] = useLocalStorage<any>("data");
  useEffect(() => {
    let info = {
      equipe_id: user.user.equipe_id,
      date: format(selectedDay, "yyy-MM-dd"),
    };
    // @ts-ignore
    axios.post("http://127.0.0.1:8000/api/collabCalander", info).then((res) => {
      // console.log(mapToArray(res.data.data))
      setSurSites(mapToArray(res.data.data));
    });

    axios
      .get("http://127.0.0.1:8000/api/collabParEquipe/" + info.equipe_id)
      .then((res) => {
        // console.log(res.data.collabs)
        setCollabs(res.data.collabs);
      });
  }, [selectedDay]);

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className='md:grid md:grid-cols-1 md:divide-x md:divide-gray-200 '>
      {/* -------------------------------------- */}
      <div className='mb-20 md:pl-14'>
        <div className='flex items-center'>
          <h2 className='flex-auto font-semibold text-gray-900'>
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={previousMonth}
            type='button'
            className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'>
            <span className='sr-only'>Previous month</span>
            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          </button>
          <button
            onClick={nextMonth}
            type='button'
            className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'>
            <span className='sr-only'>Next month</span>
            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
        <div className='mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500'>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className='grid grid-cols-7 mt-2 text-sm'>
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-2"
              )}>
              <button
                type='button'
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    "text-[#0793DB]",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-[#0793DB]",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}>
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* --------------------------------- */}
      <section className='mt-12 md:mt-0 md:pl-14  border-none '>
        <h2 className='font-semibold text-gray-900'>
          Schedule for{" "}
          <time dateTime="{format(selectedDay,'yyy-MM-dd')}">
            {format(selectedDay, "MMM dd, yyy")}
          </time>
        </h2>
        <ol className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
          {collabs.map((coll: any) => (
            <Meeting coll={coll} surSites={surSites} key={coll.id} />
          ))}
        </ol>
      </section>
      {/* ------------------------- */}
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
