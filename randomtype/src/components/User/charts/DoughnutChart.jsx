import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
  const xValues = ["win Game", "lose Game"];
  const yValues = [55, 49];
  const barColors = ["#0000ff", "#ff0000"];

  const data = {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Car Racing Game",
    },
    maintainAspectRatio: false, // This allows you to set both width and height
    responsive: true,
    width: 200, // Set the desired width
    height: 200, // Set the desired height
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;