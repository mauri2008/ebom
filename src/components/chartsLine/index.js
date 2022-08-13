import React from 'react';
import { format, parseISO} from 'date-fns'
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

const  Charts = ({ dataCharts }) =>{
  
  let delayed;
  const options = {
     
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
  

    const labels = [];
    const data = [];
    dataCharts.forEach(element => {
      let exploseDate = element.date_open.split('-')
      labels.push(exploseDate.length>0?format(new Date(exploseDate[0],exploseDate[1],exploseDate[2]), 'dd/MM/yyy'):'');
      data.push(element.total);
    });
    // const chance = Chance()
  
    const dataLine = {
      labels,
      datasets: [
          {
          label: 'Dataset 1',
          data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
      ],
      };

    return(
        <>
            <Line options={options} data={dataLine}  width="500px"/>
        </>
    )
}

export default Charts