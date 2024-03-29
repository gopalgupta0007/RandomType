/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TripChart extends Component {	
    render() {
		const options = {
            animationEnabled: true,
			exportEnabled: true,
			theme: "dark1", // "light1", "dark1", "dark2"
			title:{
				text: "About"
			},
			data: [{
                type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
                    { y: 15, label: "total User" },
					{ y: 10, label: "daliy User" },
					{ y: 30, label: "Played Games" },
					{ y: 15, label: "total typing time" },
					{ y: 20, label: "total test started" },
					{ y: 10, label: "total test completed" }	
				]
			}]
		}
		
		return (
            <div className='scale-90'>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
                />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
    export default TripChart