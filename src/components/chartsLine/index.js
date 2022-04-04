import React from 'react';
import Chance from 'chance'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
}from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
let delayed;
export const options = {
   
    plugins: {
      legend: {
        display:false ,
        position: 'bottom',
      },
      title: {
        display: true,
        text: '',
      },
    },
    animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const chance = Chance()

    export const data = {
    labels,
    datasets: [
        {
        label: 'Dataset 1',
        data: labels.map(() => chance.integer({ min: 0, max: 500 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
    };

const  Charts = () =>{
    return(
        <>
            <Line options={options} data={data}  width="500px"/>
        </>
    )
}

export default Charts