import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
  
ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  sellers: string[],
  values: number[]
}
  
export const PieChart: React.FC<IProps> = ({ sellers, values }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Quantidade de vendas por vendedor',
      },
    },
  }; 

  const labels = sellers;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Total de vendas',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      },
    ],
  };

  return(
    <Pie data={data} options={options} />
  );
};