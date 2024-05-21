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
import { format, startOfToday } from "date-fns";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns/esm";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function RhDashboardChartComponent({ equipeSelect }: any) {
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
      equipe_id: equipeSelect,
      date: arr,
    };

    let apiChart = "";
    if (equipeSelect == 0) {
      apiChart = "http://127.0.0.1:8000/api/statusSemain";
    } else {
      apiChart = "http://127.0.0.1:8000/api/collabChart";
    }

    axios.post(apiChart, inf).then((res) => {
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
      console.log(dt2);
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
  }, [equipeSelect]);
  // **************************************

  // ****************************************

  return (
    <div className='mt-7 md:h-[30rem]'>
      <Line className='h-[5rem] chart' data={data}>
        Hello
      </Line>
    </div>
  );
}
