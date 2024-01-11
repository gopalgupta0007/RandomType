import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ typingData }) => {
	console.log("LineChart");
	const chartRef = useRef(null);
	// console.log(typingData);

	const no_of_test = (index) => {
		const myArray = [];
		for (let i = 0; i <= index+1; i++) myArray.push(i);
		return myArray
	}

	useEffect(() => {
		let chartInstance = null;
		console.log(typingData);
		const wpmData = typingData.typing_data.total_wpm; // store wpm data
		const accuracyData = typingData.typing_data.total_accuracy; // store accuracy
		const xValues = no_of_test(wpmData.length) // how much time user giving test

		const ctx = chartRef.current.getContext('2d');

		// Ensure previous chart instance is destroyed
		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(ctx, {
			type: 'line',
			data: {
				labels: xValues,
				datasets: [
					{
						// wpm
						fill: true,
						lineTension: 0,
						backgroundColor: 'rgba(255,0,0,0.1)',
						borderColor: 'rgba(255,0,0,1)',
						data: wpmData,
					},
					{
						// accuracy
						fill: false,
						lineTension: 0,
						backgroundColor: 'rgba(255,255,255,0.1)',
						borderColor: 'rgba(255,255,255,1)',
						data: accuracyData,
					},
				],
			},
			options: {
				responsive: true, // Make the chart responsive
				maintainAspectRatio: false, // Override aspect ratio
				legend: { display: false },
				plugins: {
					tooltip: {
						enabled: true,
						mode: 'index',
						intersect: false,
						callbacks: {
							label: (context) => {
								const datasetIndex = context.datasetIndex;
								const index = context.dataIndex;
								const value = context.dataset.data[index];
								let label = '';

								if (datasetIndex === 0) {
									label = `WPM: ${value}`;
								} else if (datasetIndex === 1) {
									label = `Accuracy: ${value}%`;
								}

								return label;
							},
						},
					},
				},
				interaction: {
					intersect: false,
				},
				scales: {
					y: { min: 0, max: Math.max(...accuracyData) }
				},
			},
		});
		return () => {
			// Cleanup on component unmount
			if (chartInstance) {
				// chartInstance.update('active');
				chartInstance.destroy();
			}
		};
	}, [typingData]);

	return (
		<>
			<section className='flex justify-center'>
				<div style={{ width: '90%', height: '20rem' }}>
					<canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
				</div>
			</section>
		</>
	);
};

export default LineChart;
