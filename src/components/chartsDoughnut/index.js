import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Ausentes', 'Presentes'],
  datasets: [
    {
      label: '# of Votes',
      data: [30, 70],

      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',

      ],
      borderWidth: 1,
    },
  ],
};

const options = {
   
    plugins:{
        legend:{
            display:false,
        },
    }
}

export default function App() {
  return <Doughnut data={data} options={options}  />;
}