function generateChart(type) {
  var data = rounds;
  var wpms = [];
  for (var i = 0; i < rounds.length; i++) {
    wpms.push({
      label:
        rounds[0][0]["created"].getDate() +
        "-" +
        (rounds[0][0]["created"].getMonth() + 1) +
        "-" +
        rounds[0][0]["created"].getFullYear(),
      y: type == "wpm" ? rounds[i][0]["wpm"] : rounds[i][0]["points"],
    });
  }
  console.log(wpms);
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme1",
    title: {
      text: "",
    },

    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "line",
        //lineThickness: 3,
        dataPoints: wpms,
      },
    ],
  });

  chart.render();
}
