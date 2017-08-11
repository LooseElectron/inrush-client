$(function() {

    var ws = new WebSocket("ws://localhost:8181");

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
      ws.send(JSON.stringify(stock_request));
    }

    var changeStockEntry = function(symbol, originalValue, newValue) {
        var valElem = $('#' + symbol + ' span');
        valElem.html(newValue.toFixed(2));
        if(newValue < originalValue) {
            valElem.addClass('label-danger');
            valElem.removeClass('label-success');
        } else if(newValue > originalValue) {
            valElem.addClass('label-success');
            valElem.removeClass('label-danger');
        }
    }

    ws.onmessage = function(e) {
      var stocksData = JSON.parse(e.data);
      for(var symbol in stocksData) {
          if(stocksData.hasOwnProperty(symbol)) {
              changeStockEntry(symbol, stocksData[symbol], stocks[symbol]);
              stocks[symbol] = stocksData[symbol];
          }
      }
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


