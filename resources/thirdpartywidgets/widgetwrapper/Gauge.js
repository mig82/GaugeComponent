
Gauge = {
	initializeWidget: function(parentNode, widgetModel) {
		debugger;
		console.log("flag-0");
		parentNode.innerHTML = "<div id='chartdiv'>Hello World</div>";
	},
	modelChange: function(widgetModel, propertyChanged, propertyValue) {
		debugger;
		console.log("flag-1");
	}
};
