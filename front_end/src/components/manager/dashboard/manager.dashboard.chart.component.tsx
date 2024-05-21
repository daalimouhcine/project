// import { useState } from 'react';
//@ts-ignore
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
// import { useState } from 'react';
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
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Console } from "console";
import useLocalStorage from "@/common/hooks/useLocalStorage";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
export default function ManagerDashboardChartComponent() {
  // let week_1 = eachDayOfInterval({
  //       start:startOfWeek(startOfToday()),
  //       end: endOfWeek(startOfToday()),
  //     })

  //     let i:any
  //     let arr=[]
  //     for(i=1;i<week_1.length-1;i++){
  //     arr.push(format(week_1[i], "yyyy-MM-dd"))
  //     }
  //       console.log(arr)
  //     let inf = {
  //       equipe_id: 3,
  //       date: arr
  //     }
  // ****************************************
  const [user] = useLocalStorage<any>("data");

  const [data, setData] = useState<any>({
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    datasets: [
      {
        label: "Fdataset",
        data: [],
        backgroundColor: "gray",
        borderColor: "gray",
        tension: "0.4",
        pointStyle: "rect",
      },
      {
        label: "dataset",
        data: [],
        backgroundColor: "#0793DB",
        borderColor: "#0793DB",
        tension: "0.4",
        pointStyle: "rect",
      },
    ],
  });

  useEffect(() => {
    let week_1 = eachDayOfInterval({
      start: startOfWeek(startOfToday()),
      end: endOfWeek(startOfToday()),
    });

    let i: any;
    let arr = [];
    for (i = 1; i < week_1.length - 1; i++) {
      arr.push(format(week_1[i], "yyyy-MM-dd"));
    }
    let inf = {
      equipe_id: user.user.equipe_id,
      date: arr,
    };

    axios.post("http://127.0.0.1:8000/api/collabChart", inf).then((res) => {
      let dt = [
        res.data.A1,
        res.data.A2,
        res.data.A3,
        res.data.A4,
        res.data.A5,
      ];
      let dt2 = [
        res.data.S1,
        res.data.S2,
        res.data.S3,
        res.data.S4,
        res.data.S5,
      ];

      setData({
        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
        datasets: [
          {
            label: "A distance",
            data: dt,
            backgroundColor: "gray",
            borderColor: "gray",
            tension: "0.4",
            pointStyle: "rect",
          },
          {
            label: "Sur site",
            data: dt2,
            backgroundColor: "#0793DB",
            borderColor: "#0793DB",
            tension: "0.4",
            pointStyle: "rect",
          },
        ],
      });
    });
  }, []);
  // ****************************************

  // console.log(Object.values(statJours))

  console.log(data);
  const mystyle = {
    width: "800px",
    height: "800px",
  };
  return (
    <div>
      <Line data={data} style={mystyle}>
        Hello
      </Line>
    </div>
  );
}
