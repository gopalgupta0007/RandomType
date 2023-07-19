import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ShowResult from './ShowResult';
import { useSelector} from 'react-redux';
// import {storeWPM} from "../../../redux/action/Actions"
// import { useDispatch } from 'react-redux';

Chart.register(...registerables);

const ResultGraph = () => {
	// const dispatch = useDispatch();
	const typing_data = useSelector((state)=>state.TypingTestReducer)
	const chartRef = useRef(null);

	useEffect(() => {
		let chartInstance = null;

		const xValues = typing_data.typing_test_data.no_of_test.map((num, index)=>num*index);  // how much time user giving test
		const wpmData = typing_data.typing_test_data.total_wpm; // store wpm data
		const accuracyData = typing_data.typing_test_data.total_accuracy; // store accuracy

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
					y: { min: 0, max: Math.max(...accuracyData) }  // set highest typing speed data in scales.max 
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
