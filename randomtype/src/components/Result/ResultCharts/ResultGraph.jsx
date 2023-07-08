import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
// https://canvasjs.com/react-charts/
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ResultGraph extends Component {
	render() {       
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: "Result"
			},
			axisY: {
				title: "WPM",
				suffix: "%"
			},
			toolTip: {
				shared: true,   
				reversed: true
			},
			legend: {
				verticalAlign: "bottom",
				horizontalAlign: "left",
				reversed: false
			},
			data: [
			{
				type: "stackedArea100",
				name: "WPM",
				showInLegend: true,
				xValueFormatString: "YYYY",
                // x how many time played test
                // y store the data of wpm after ending test
				dataPoints: [
					{ x: new Date(2000, 0), y: 40 },
					{ x: new Date(2001, 0), y: 62 },
					{ x: new Date(2002, 0), y: 53 },
					{ x: new Date(2003, 0), y: 49 },
					{ x: new Date(2004, 0), y: 52 },
					{ x: new Date(2005, 0), y: 32 },
					{ x: new Date(2006, 0), y: 28 },
					{ x: new Date(2007, 0), y: 46 },
					{ x: new Date(2008, 0), y: 55 },
					{ x: new Date(2009, 0), y: 88 },
					{ x: new Date(2010, 0), y: 68 },
					{ x: new Date(2011, 0), y: 63 },
					{ x: new Date(2012, 0), y: 65 },
					{ x: new Date(2013, 0), y: 68 },
					{ x: new Date(2014, 0), y: 48 },
					{ x: new Date(2015, 0), y: 39 },
					{ x: new Date(2016, 0), y: 20 },
					{ x: new Date(2017, 0), y: 26 }
				]
			},
			{
				type: "stackedArea100",
				name: "ACCURACY",
				showInLegend: true,
				xValueFormatString: "YYYY",
				dataPoints: [
					{ x: new Date(2000, 0), y: 20 },
					{ x: new Date(2001, 0), y: 12 },
					{ x: new Date(2002, 0), y: 19 },
					{ x: new Date(2003, 0), y: 28 },
					{ x: new Date(2004, 0), y: 42 },
					{ x: new Date(2005, 0), y: 75 },
					{ x: new Date(2006, 0), y: 85 },
					{ x: new Date(2007, 0), y: 55 },
					{ x: new Date(2008, 0), y: 45 },
					{ x: new Date(2009, 0), y: 38 },
					{ x: new Date(2010, 0), y: 29 },
					{ x: new Date(2011, 0), y: 19 },
					{ x: new Date(2012, 0), y: 14 },
					{ x: new Date(2013, 0), y: 18 },
					{ x: new Date(2014, 0), y: 16 },
					{ x: new Date(2015, 0), y: 13 },
					{ x: new Date(2016, 0), y: 10 },
					{ x: new Date(2017, 0), y: 14 }
				]
			},
			{
				type: "stackedArea100",
				name: "TIME",
				showInLegend: true,
				xValueFormatString: "YYYY",
				dataPoints: [
					{ x: new Date(2000, 0), y: 0 },
					{ x: new Date(2001, 0), y: 6 },
					{ x: new Date(2002, 0), y: 8 },
					{ x: new Date(2003, 0), y: 10 },
					{ x: new Date(2004, 0), y: 12 },
					{ x: new Date(2005, 0), y: 15 },
					{ x: new Date(2006, 0), y: 17 },
					{ x: new Date(2007, 0), y: 18 },
					{ x: new Date(2008, 0), y: 25 },
					{ x: new Date(2009, 0), y: 18 },
					{ x: new Date(2010, 0), y: 24 },
					{ x: new Date(2011, 0), y: 29 },
					{ x: new Date(2012, 0), y: 31 },
					{ x: new Date(2013, 0), y: 52 },
					{ x: new Date(2014, 0), y: 72 },
					{ x: new Date(2015, 0), y: 63 },
					{ x: new Date(2016, 0), y: 20 },
					{ x: new Date(2017, 0), y: 18 }
				]
			}
		]
		}
		return (
		<div>
			<CanvasJSChart className="bg-red-500" options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ResultGraph;

// <!DOCTYPE html>
// <html>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
// <body>
// <canvas id="myChart" style="width:100%;max-width:600px"></canvas>

// <script>
// const xValues = [50,60,70,80,90,100,110,120,130,140,150];
// const yValues1 = [7,8,8,9,9,9,10,11,14,14,15];
// const yValues2 = [9,10,11,12,12,12,13,14,15,15,20];

// new Chart("myChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       label: "stackedArea100",
//       fill: false,
//       lineTension: 0,
//       backgroundColor: "rgba(0,0,255,1.0)",
//       borderColor: "rgba(0,0,255,0.1)",
//       data: yValues1
//     }, {
//       label: "Line 2",
//       fill: false,
//       lineTension: 0,
//       backgroundColor: "rgba(255,0,0,1.0)",
//       borderColor: "rgba(255,0,0,0.1)",
//       data: yValues2
//     }]
//   },
//   options: {
//     legend: {display: true},
//     scales: {
//       yAxes: [{ticks: {min: 6, max: 16}}],
//     }
//   }
// });
// </script>

// </body>
// </html>
