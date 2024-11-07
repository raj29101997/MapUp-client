import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PointStyleChart = ({ tripData }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const points = tripData.map((record, index) => ({
                    x: index,
                    y: parseFloat(record.total_amount),
                }));
                setChartData(points);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [tripData]);

    useEffect(() => {
        if (chartData.length > 0) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            const config = {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Fare Amount',
                        data: chartData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointRadius: 5,
                        pointStyle: 'circle',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.dataset.label || '';
                                    const value = context.raw.y;
                                    return `${label}: $${value}`;
                                }
                            }
                        },
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Taxi Trip Fare Amounts'
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Trip Number'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Fare Amount ($)'
                            }
                        }
                    }
                }
            };

            chartInstanceRef.current = new Chart(ctx, config);
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PointStyleChart;