import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

function BarChart({tripData}) {
    const labels = tripData.map((trip, index) => `Trip ${index + 1}`);
    const fareAmounts = tripData.map(trip => parseFloat(trip.fare_amount));
    const extras = tripData.map(trip => parseFloat(trip.extra));
    const tips = tripData.map(trip => parseFloat(trip.tip_amount));
    const totalAmounts = tripData.map(trip => parseFloat(trip.total_amount));

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Fare Amount ($)',
                data: fareAmounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Extra Charges ($)',
                data: extras,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Tips ($)',
                data: tips,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Total Amount ($)',
                data: totalAmounts,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <div>
            <h2>Taxi Trip Profit and Loss Analysis</h2>
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    );
}

export default BarChart;