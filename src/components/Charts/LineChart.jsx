import React, { useMemo } from 'react';
import { Bubble, Line } from 'react-chartjs-2';
import { Chart, BubbleController, PointElement, LinearScale, Tooltip, Legend } from 'chart.js';

// Register required components
Chart.register(BubbleController, PointElement, LinearScale, Tooltip, Legend);

const LineChart = ({ tripData }) => {
    const bubbleData = useMemo(() => {
        const data = tripData.map(trip => ({
            x: parseFloat(trip.trip_distance || 0),
            y: parseFloat(trip.total_amount || 0),
            r: parseFloat(trip.passenger_count || 1) * 3 // Bubble size based on passenger count
        }));

        return {
            datasets: [
                {
                    label: 'Trip Distance vs Total Amount',
                    data,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [tripData]);

    const options = useMemo(() => ({
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Trip Distance',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Amount',
                },
            },
        },
    }), []);

    return <Bubble data={bubbleData} options={options} />;
};

export default LineChart;