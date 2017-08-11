$(function() {

    var ws = new WebSocket("ws://10.148.17.107:8080");

    var stock_request = {
        "stocks": ["AAPL", "MSFT", "AMZN", "GOOG", "YHOO"]
    };

    var stocks = {
        "AAPL": 0,
        "MSFT": 0,
        "AMZN": 0,
        "GOOG": 0,
        "YHOO": 0
    }

    $('#AAPL span').toggleClass('label-success');
    ws.onopen = function(e) {
      console.log('Connection to server opened');
      ws.send("subscribe AAPL");
      ws.send("subscribe MSFT");
      ws.send("subscribe AMZN");
      ws.send("subscribe GOOG");
      ws.send("subscribe YHOO");
    }

    var changeStockEntry = function(symbol, originalValue, newValue) {
        var valElem = $('#' + symbol + ' span');
        valElem.html(newValue.toFixed(2));
        console.log (newValue , originalValue, newValue < originalValue)
        if(newValue < originalValue) {
            valElem.addClass('label-danger');
            valElem.removeClass('label-success');
        } else if(newValue > originalValue) {
            valElem.addClass('label-success');
            valElem.removeClass('label-danger');
        }
    }

    ws.onmessage = function(e) {
      var stockData = JSON.parse(e.data);
      var askPrice = stockData.update.ask / 100
      changeStockEntry(stockData.update.symbol, stocks[stockData.update.symbol], askPrice);
      stocks[stockData.update.symbol] = askPrice;

//      for(var symbol in stockData) {
//          if(stockData.hasOwnProperty(symbol)) {
//              changeStockEntry(symbol, stockData[symbol], stocks[symbol]);
//              stocks[symbol] = stockData[symbol];
//          }
//      }
    }
    ws.onclose = function(e) {
      console.log("Connection closed");
      for(var symbol in stocks) {
          if(stocks.hasOwnProperty(symbol)) {
              stocks[symbol] = 0;
          }
      }

    }

    function disconnect() {
      ws.close();
    }
});


