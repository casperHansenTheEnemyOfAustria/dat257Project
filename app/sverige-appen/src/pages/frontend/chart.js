'use client'
import React from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';


export default function Chart() {

  return (
    <Line
    className="chart"
    data = {{
      labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      datasets: [
        {
          label: 'Emissions',
          data: [200, 300, 400, 500, 600, 700, 800, 900, 1000],
        }, 
      ],
    }}>
    </Line>
  );
}