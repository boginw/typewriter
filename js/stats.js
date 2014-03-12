 function generateChart(){
	var data = rounds;
	var wpms = [];
	for(var i=0;i<rounds.length;i++){
		wpms.push({label:rounds[0][0]['created'].getDate()+'-'+(rounds[0][0]['created'].getMonth()+1)+'-'+rounds[0][0]['created'].getFullYear(),
		y:(chrome.app.window.current().id == 'wpm' ? rounds[i][0]['wpm'] : rounds[i][0]['points'])});
	}
	console.log(wpms);
	 var chart = new CanvasJS.Chart("chartContainer",
		{
		  theme: "theme1",
		  title:{
			text: ""
		  },

		  axisY:{
			includeZero: true
			
		  },
		  data: [
		  {        
			type: "line",
			//lineThickness: 3,        
			dataPoints: wpms
			
		  }
		  
		  
		  ]
		});

	chart.render();
	window.clearInterval(starter);
}
document.getElementsByClassName('info')[0].innerHTML = (chrome.app.window.current().id == 'wpm' ? 'Orð um minnutin' : 'Stig');
var starter = setInterval(function(){getWPMs(function(){generateChart()})},500);