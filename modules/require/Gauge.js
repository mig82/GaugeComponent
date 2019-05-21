//Require modules
Gauge = {
	initializeWidget: function(parentNode, widgetModel) {
		debugger;
		console.log("flag-0");
		
		parentNode.innerHTML = "<div id='chartdiv'>Hello World</div>";

		this.loadAmChartsScripts()
		.then(() => {
			console.log("flag-4");
			this.createGaugeChart();
		});
		
		
	},
	
	modelChange: function(widgetModel, propertyChanged, propertyValue) {
		debugger;
	},
	
	loadScript: function(parent, srcUrl){

		var script = document.createElement('script');
		script.src = srcUrl;

		return new Promise((resolve, reject) => {

			script.onload = (response) => {
				resolve(response);
			};
			
			script.onerror = (error) => {
				reject(error);
			};
			
			try{
				parent.appendChild(script);
			}
			catch(error){
				reject(error);
			}
		});
	},

	loadAmChartsScripts: function(){
		
		var appendToElm = document.getElementsByTagName('head')[0];
		//var appendToElm = document.getElementsByTagName('body')[0];

		return this.loadScript(appendToElm, "https://www.amcharts.com/lib/version/4.4.6/core.js")
		.then(() => {
			console.log("flag-1");
			this.loadScript(appendToElm, "https://www.amcharts.com/lib/version/4.4.6/charts.js");
		})
		.then(() => {
			console.log("flag-2");
			this.loadScript(appendToElm, "https://www.amcharts.com/lib/version/4.4.6/themes/dataviz.js");
		})
		.then(() => {
			console.log("flag-3");
			this.loadScript(appendToElm, "https://www.amcharts.com/lib/version/4.4.6/themes/animated.js");
		});
	},

	createGaugeChart: function(){
		am4core.ready(function() {

			console.log("flag-5");
			
			// Themes begin
			am4core.useTheme(am4themes_dataviz);
			am4core.useTheme(am4themes_animated);
			// Themes end

			// create chart
			var chart = am4core.create("chartdiv", am4charts.GaugeChart);
			chart.innerRadius = am4core.percent(85);
			var title = chart.titles.create();
			title.text = "Foo";
			title.fontSize = 14;
			title.marginBottom = 0;

			/**
			 * Normal axis
			 */

			var axis = chart.xAxes.push(new am4charts.ValueAxis());
			axis.min = 0;
			axis.max = 10;
			axis.strictMinMax = true;
			axis.renderer.radius = am4core.percent(80);
			axis.renderer.inside = true;
			axis.renderer.line.strokeOpacity = 1;
			axis.renderer.ticks.template.strokeOpacity = 1;
			axis.renderer.ticks.template.length = 10;
			axis.renderer.grid.template.disabled = true;
			axis.renderer.labels.template.radius = 14;
			axis.renderer.labels.template.adapter.add("text", function(text) {
				return text;
			});
			axis.fontSize = 11;
			axis.labelsEnabled = false;

			/**
			 * Axis for ranges
			 */

			var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
			axis2.min = 0;
			axis2.max = 10;
			axis2.renderer.innerRadius = 0;
			axis2.strictMinMax = true;
			axis2.renderer.labels.template.disabled = true;
			axis2.renderer.ticks.template.disabled = true;
			axis2.renderer.grid.template.disabled = true;

			var range0 = axis2.axisRanges.create();
			range0.value = 0;
			range0.endValue = 5;
			range0.axisFill.fillOpacity = 1;
			range0.axisFill.fill = "#C30045";

			var range1 = axis2.axisRanges.create();
			range1.value = 5;
			range1.endValue = 10;
			range1.axisFill.fillOpacity = 1;
			range1.axisFill.fill = "#4F5F6C";

			/**
			 * Label
			 */

			var label = chart.radarContainer.createChild(am4core.Label);
			label.isMeasured = false;
			label.fontSize = 16;
			label.x = am4core.percent(50);
			label.y = am4core.percent(100);
			label.horizontalCenter = "middle";
			label.verticalCenter = "center";
			label.text = "5";

			/**
			 * Hand
			 */
			var hand = chart.hands.push(new am4charts.ClockHand());
			hand.axis = axis2;
			hand.innerRadius = am4core.percent(10);
			hand.startWidth = 7;
			hand.pin.disabled = true;
			hand.value = 2;

			hand.events.on("propertychanged", function(ev) {
				range0.endValue = ev.target.value;
				range1.value = ev.target.value;
				axis2.invalidate();
			});
		}); // end am4core.ready()
	}
};
