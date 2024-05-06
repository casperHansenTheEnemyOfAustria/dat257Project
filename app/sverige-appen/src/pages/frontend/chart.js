'use client'
import React from "react";
import { Line } from "react-chartjs-2";


export default function LineChart({ repo }) {
    const years = repo.repo.counties[0].years;
    const emission = repo.repo.counties[0].emission;


  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
  data={{
    labels: years, // array of labels for the x-axis
    datasets: [
      {
        label: 'Emission', // label for the dataset
        data: emission, // array of data for the y-axis
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  }}
  options={{
    plugins: {
      title: {
        display: true,
        text: "Titleee"
      },
      legend: {
        display: false
      }
    }
  }}
/>
    </div>
  );
}