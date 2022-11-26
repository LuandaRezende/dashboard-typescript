import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  sellers: string[],
  values: number[]
}
  
export const BarChart: React.FC<IProps> = ({ sellers, values }) => {

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
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return(
    <Bar data={data} options={options} />
  );
};