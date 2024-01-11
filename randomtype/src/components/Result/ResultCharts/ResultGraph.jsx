import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ShowResult from './ShowResult';

Chart.register(...registerables);

const ResultGraph = ({ typingData, keyData }) => {
	console.log("ResultGraph");
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
		// if (condition) {

		// } else {

		// }
		// const xValues = typingData.typing_data.no_of_test // how much time user giving test
		// const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] // how much time user giving test
		// const xValues = no_of_test(typingData.typing_data.total_wpm.length); // how much time user giving test

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
				chartInstance.update('active');
				chartInstance.destroy();
			}
		};
	}, [typingData]);

	return (
		<>
			<section className='flex justify-center'>
				<div>
					<ShowResult keyData={keyData} />
				</div>
				<div style={{ width: '80%', height: '30rem', transition : 'all .1s' }}>
					<canvas ref={chartRef} style={{ width: '100%', height: '100%', transition : 'all .1s' }} />
				</div>
			</section>
		</>
	);
};

export default ResultGraph;
