import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ tripData }) {
    const [selectedTripIndex, setSelectedTripIndex] = useState(0);

    const handleTripChange = (event) => {
        setSelectedTripIndex(Number(event.target.value));
    };
    const selectedTrip = tripData[selectedTripIndex] || {};

    const pieData = {
        labels: ['Fare Amount', 'Extras', 'Tip', 'Tolls', 'Surcharge', 'Congestion Surcharge'],
        datasets: [
            {
                label: 'Cost Breakdown',
                data: [
                    parseFloat(selectedTrip.fare_amount || 0),
                    parseFloat(selectedTrip.extra || 0),
                    parseFloat(selectedTrip.tip_amount || 0),
                    parseFloat(selectedTrip.tolls_amount || 0),
                    parseFloat(selectedTrip.improvement_surcharge || 0),
                    parseFloat(selectedTrip.congestion_surcharge || 0)
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div>
            <h2>Taxi Trip Cost Breakdown</h2>

            <label>Select a Trip: </label>
            <select onChange={handleTripChange} value={selectedTripIndex}>
                {tripData.map((trip, index) => (
                    <option key={trip._id} value={index}>
                        Trip {index + 1}
                    </option>
                ))}
            </select>

            <div style={{ height: 400, width: 600, margin: 'auto' }}>
                <Pie data={pieData} options={{ responsive: true }} />
            </div>
        </div>
    );
}

export default PieChart;