import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ShowResult from './ShowResult';

Chart.register(...registerables);

const ResultGraph = () => {
	const chartRef = useRef(null);

	useEffect(() => {
		let chartInstance = null;

		const xValues = [1, 30, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];  // how much time use doing test
		const wpmData = [1, 7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 20]; // store wpm data
		const accuracyData = [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 20]; // store accuracy

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
				title: {
					display: true,
					text: "Result",
					fontSize: 20
				},
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
					y: { min: 0, max: Math.max(...wpmData) }  // set highest typing speed data in scales.max 
				},
			},
		});
		return () => {
			// Cleanup on component unmount
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	}, []);

	return (
		<>
			<section className='flex justify-center'>
				<div>
					<ShowResult />
				</div>
				<div style={{ width: '80%', height: '30rem' }}>
					<canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
				</div>
			</section>
		</>
	);
};

export default ResultGraph;
