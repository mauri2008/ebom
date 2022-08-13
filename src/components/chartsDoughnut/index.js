import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function App( { dataChart } ) {
  
  let data = []
  dataChart.forEach(element => {
    data.push(element.value)
  });
console.log(data)
 const dataDoughnut = {
    labels: ['Ausentes', 'Presentes','Isentos Presente'],
    datasets: [
      {
        label: '# of Votes',
        data,
  
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(3, 187, 133, 0.2)',
  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(3, 187, 133, 1)',
  
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


  return <Doughnut data={dataDoughnut} options={options}  />;
}