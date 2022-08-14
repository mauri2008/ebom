import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DescriptionCharts, ItemDescription, ColorDescription } from './style'

ChartJS.register(ArcElement, Tooltip, Legend);


export default function ChartsDoughnut( { dataChart } ) {

  const [doughnutData, setDoughnutData] = useState([])

  const setValueCharts = () =>{
    const reportsDougnut= [
        {name:'Ausentes', color:'rgba(255, 99, 132, 1)', value:dataChart?.totalAbserts??0},
        {name:'Presentes', color:'rgba(54, 162, 235, 1)', value:dataChart?.present??0},
        {name:'Isentos Presente', color:'rgba(3, 187, 133, 1)', value:dataChart?.notPaying??0},
    ]
    setDoughnutData(reportsDougnut);
  }

  useEffect(()=>{
    setValueCharts()
  },[])

  
  
 const dataDoughnut = {
    labels: doughnutData.map(dataLabel=>dataLabel.name),
    datasets: [
      {
        label: '# of Votes',
        data:doughnutData.map(data=>data.value),
  
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(3, 187, 133, 0.2)',
  
        ],
        borderColor: doughnutData.map(dataColor=>dataColor.color),
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


  return (
    <div>
      <Doughnut data={dataDoughnut} options={options}  />
      <DescriptionCharts>
        {
          doughnutData.map((element, index)=>(
            <ItemDescription key={`${element.name}-${index}`}>
                <ColorDescription color={element.color}/>
                <p>{element.name}</p>
            </ItemDescription>
          ))
        }
      </DescriptionCharts>
    </div>
  );
}