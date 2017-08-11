$(document).ready(function() {
     var ctx = document.getElementById("myChart").getContext('2d');
     ctx.canvas.width = 512;
     ctx.canvas.height = 512;
     var myChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: ["one", "two", "three", "four", "five"],
             datasets: [{
                 label: 'Ask',
                 data: [0, 0, 0, 0, 0],
                 borderColor: "rgba(255, 0, 0, 0.5)",
                 pointBackgroundColor: "rgba(255, 0, 0, 0.9)",
                         },
                         {
                 label: 'Bid',
                 data: [0, 0, 0, 0, 0],
                 borderColor: "rgba(0, 255, 0, 0.5)",
                 pointBackgroundColor: "rgba(0, 255, 0, 0.9)",
                         }]
         },
         options: {
               responsive: false,
             scales: {
                 yAxes: [{
                     ticks: {
                         min:2000,
                         max:0,
                         beginAtZero:true
                     }
                 }]
             }
         }
     });


     var ws = new WebSocket("ws://10.148.17.107:8080");

     ws.onopen = function(e) {
           console.log('Connection to server opened');
           ws.send("subscribe AAPL");
     }

     ws.onmessage = function(e) {
          var stockData = JSON.parse(e.data);
          var askPrice = stockData.update.ask / 100;
          var bidPrice = stockData.update.bid / 100;

          myChart.data.datasets.forEach((dataset) => {
               dataset.data.shift();
               if (dataset.label == "Ask")
                    dataset.data.push(askPrice);
               else if (dataset.label == "Bid")
                    dataset.data.push(bidPrice);
                    });

          var minprice = myChart.options.scales.yAxes[0].ticks.min;
          var maxprice = myChart.options.scales.yAxes[0].ticks.max;
          console.log("graph: " + myChart.options.scales.yAxes[0].ticks.min);
          if (askPrice < minprice)
              myChart.options.scales.yAxes[0].ticks.min = askPrice - .05;
          if (bidPrice < minprice)
              myChart.options.scales.yAxes[0].ticks.min = bidPrice - .05;
          if (askPrice > maxprice)
              myChart.options.scales.yAxes[0].ticks.max = askPrice + .05;
          if (bidPrice > maxprice)
              myChart.options.scales.yAxes[0].ticks.max = bidPrice + .05;

          myChart.update();
     }
});
